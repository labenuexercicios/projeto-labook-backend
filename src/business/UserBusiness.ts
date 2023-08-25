import { regexEmail, regexPassword } from "../constant/regex";
import { UsersDatabase } from "../database/UsersDatabase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/user"; 
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { USER_ROLES, TokenPayLoad, UserDB } from "../types";

export class UserBusiness {
    constructor(
        private usersDatabase: UsersDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        if (!email.match(regexEmail)) {
            throw new BadRequestError("Parâmetro de 'email' inválido")
        }

        if (!password.match(regexPassword)) {
            throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const hashPassword = await this.hashManager.hash(password)

        const newUser = new User(
            this.idGenerator.generate(),
            name,
            email,
            hashPassword,
            USER_ROLES.NORMAL, // só é possível criar users com contas normais
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        await this.usersDatabase.insertUser(newUserDB)

        const tokenPayload: TokenPayLoad = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }
        const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.usersDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const passwordCompare = await this.hashManager.compare(password, user.getPassword())

        if (!passwordCompare) {
            throw new BadRequestError("password está incorreto")
        }

        const tokenPayload: TokenPayLoad = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: LoginOutputDTO = {
            token
        }

        return output
    }
}