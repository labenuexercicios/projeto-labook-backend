import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto";
import { SignupInputDTO, SignupOutputDTO, } from "../dtos/user/signup.dto";
import { BadRequestError } from "../erros/BadRequestError";
import { NotFoundError } from "../erros/NotFoundError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManeger: HashManager
    ){}

public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name,  email, password } = input

    const id = this.idGenerator.generate()

    const hashedPassword = await this.hashManeger.hash(password)

    const user = new User(
        id,
        name,
        email,
        hashedPassword,
        USER_ROLES.NORMAL,
        new Date().toISOString()

    )

    const userDB = user.toDBModel()
    await this.userDatabase.insertUser(userDB)
    
    const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
    }

    const token = this.tokenManager.createToken(payload)

    const output: SignupOutputDTO = {
        token: token
    }

    return output

    }

    public login = async (input:LoginInputDTO): Promise<LoginOutputDTO> =>{
        const { email, password} = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("email não foi cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at

        )

     const isPasswordCorret = await this.hashManeger.compare(password,user.getPassword())    

     if (!isPasswordCorret){
        throw new BadRequestError("e-mail e/ou senha inválido(s)")
     }

     const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
     }

      const token = this.tokenManager.createToken(payload)

      const output: LoginOutputDTO = {
        token
      }

      return output

    }
}
