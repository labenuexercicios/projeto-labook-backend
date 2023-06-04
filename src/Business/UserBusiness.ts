import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInput, GetUsersOutput, LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { TokenPayload, USER_ROLES } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager // injetamos o serviço
    ) { }

    public getUsers = async (input: GetUsersInput): Promise<GetUsersOutput> => {
        const { q, token } = input;

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("'q' deve ser uma string ou indefinido");
        }

        const usersDB = await this.userDatabase.findUsers();

        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            );

            return user.toBusinessModel();
        });

        const output: GetUsersOutput = users;

        return output;
    };

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const { name, email, password } = input;

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser uma string");
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser uma string");
        }

        const verifyEmail = await this.userDatabase.findUserByEmail(email)

        if(verifyEmail){
            throw new BadRequestError("'email' já cadastrado!");
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser uma string");
        }

        const id = this.idGenerator.generate();
        const hashedPassword = await this.hashManager.hash(password)
        
        console.log(hashedPassword)

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword, // usamos a senha hasheada em vez da senha plaintext
            USER_ROLES.NORMAL, // só é possível criar usuários com contas normais
            new Date().toISOString()
        );

        const newUserDB = newUser.toDBModel();
        // await this.userDatabase.insertUser(newUserDB);

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole(),
        };

        const token = this.tokenManager.createToken(payload);

        const output: SignupOutput = {
            message: "Cadastro realizado com sucesso",
            token: token
        };

        return output;
    };

    public login = async (input: LoginInput): Promise<LoginOutput> => {
        const { email, password } = input;

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser uma string");
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser uma string");
        }

        const userDB = await this.userDatabase.findUserByEmail(email);

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado");
        }
        	// o password hasheado está no banco de dados
		const hashedPassword = userDB.password

        // o serviço hashManager analisa o password do body (plaintext) e o hash
		const isPasswordCorrect = await this.hashManager.compare(password, hashedPassword)

        if (!isPasswordCorrect) {
            throw new BadRequestError("'email' ou 'password' incorretos");
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        );

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),
        };

        const token = this.tokenManager.createToken(payload);

        const
            output: LoginOutput = {
                message: "Login realizado com sucesso",
                token: token
            };

        return output;
    };
}