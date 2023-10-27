import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

        const { name, email, password } = input

        const isEmailCorrect = await this.userDatabase.findbyEmail(email)

        if (isEmailCorrect) {
            throw new ConflictError("Email já cadastrado")

        }
        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )
        const response = await this.userDatabase.insertUser(user.toDBModel())
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),

        }

        const token = this.tokenManager.createToken(payload)

        const output: SignupOutputDTO = {
            token: token
        }
        return output
    }
    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO > => {
        const { email, password } = input

        const userDB = await this.userDatabase.findbyEmail(email)

        if (!userDB) {
            throw new NotFoundError("email não registrado")
        }
        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        const isPassordCorrect = await this.hashManager.compare(password, user.getPassword())
        if (!isPassordCorrect) {
            throw new BadRequestError("senha incorreta!!")
        }
        const payload:TokenPayload={
            id:user.getId(),
            name:user.getName(),
            role:user.getRole()
        }
        const token = this.tokenManager.createToken(payload)
        const output:LoginOutputDTO={
            token:token
        }
        return output
    }
}