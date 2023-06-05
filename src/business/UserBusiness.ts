import { LoginInputDTO, LoginOutputDTO} from "../DTOs/user/login.dto";
import { SingUpInputDTO, SingUpOutputDTO } from "../DTOs/user/singnUp.dto";
import { UserDatabase } from "../database/UserDataBase";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, USER_ROLES, User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";



export class UserBusiness{
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashmanager: HashManager
    ){}

    public signUp = async (input: SingUpInputDTO): Promise<SingUpOutputDTO> =>{
        
        const {name, email, password} = input

        const id = this.idGenerator.generate()

        const hashedPassword = await this.hashmanager.hash(password)

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

            const payLoad: TokenPayload = {
                id: user.getId(),
                name: user.getName(),
                role: user.getRole()
            }

        const result: SingUpOutputDTO = {
            token: this.tokenManager.createToken(payLoad)
        }

        return result

    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> =>{
       const {email, password} = input

       const userDb = await this.userDatabase.findUserByEmail(email)

       if(!userDb){
        throw new BadRequestError ("Email e/ou senha inválido(s)")
       }

       const user = new User(
        userDb.id,
        userDb.name,
        userDb.email,
        userDb.password,
        userDb.role,
        userDb.created_at
       )

       const hashedPassword = user.getPassword()

       const isCorrectPassword = await this.hashmanager.compare(password, hashedPassword)

       if(!isCorrectPassword){
        throw new BadRequestError ("Email e/ou senha inválido(s)")
       }

       const payload: TokenPayload = {
        id: user.getId(),
        name: user.getName(),
        role: user.getRole()
       }

       const token = this.tokenManager.createToken(payload)

       const result: LoginOutputDTO = {
         token
       }
   
       return result

    }
}