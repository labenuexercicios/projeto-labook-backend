import { UserDataBase } from "../database/UserDataBase";
import { LoginInputDTO, LoginOutputDTO, SignupInputDTO, SignupOutputDTO } from "../dto/userDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { TokenPayload, TUser } from "../models/types";
import { User } from "../models/User";
import {USER_ROLES} from "../models/types"
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { HashManager } from "../services/HashManager";

export class UserBusiness {
    constructor(
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ){}
    public createUsers = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    
            const {  name, email, password } = input
    
            if ( !name || !email || !password ) {
                throw new BadRequestError("Dados inválidos")
            }
    
            if (name !== undefined) {
    
                if (typeof name !== "string") {
                    throw new BadRequestError("'name' deve ser string")
                    }
                }
            if (email !== undefined) {
    
                if (typeof email !== "string") {
                    throw new BadRequestError("'email' deve ser string")
                    }
                }
    
            if (password !== undefined) {
    
                if (typeof password !== "string") {
                    throw new BadRequestError("'password' deve ser string")
                    }
                }
            
    
    
            const emailExists = await this.userDataBase.findPostUserEmail(email)
    
            if (emailExists) {
                throw new BadRequestError("'email' do usuário já existe")
            }
    
            if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                throw new BadRequestError("Parâmetro 'email' inválido")
            }
    
            const userInstance = new User(
                this.idGenerator.generate(),
                name,
                email,
                password,
                USER_ROLES.USUARIO,
                new Date().toISOString()
            )
    
    
            const newUser : TUser =  {
                id: userInstance.getId(),
                name: userInstance.getName(),
                email: userInstance.getEmail(),
                password: userInstance.getPassword(),
                role: userInstance.getRole(),
                created_at: userInstance.getCreatedAt()

            }
            
    
            await this.userDataBase.insertPostUser(newUser)

            const token = this.tokenManager.createToken(newUser)

            const output : SignupOutputDTO={
                token: token
            }

            return (output)
    }

    public createUsersLogin = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
        
        const { email, password} = input
    
            if ( !email || !password ) {
                throw new BadRequestError("Dados inválidos")
            }
    
         
            if (email !== undefined) {
    
                if (typeof email !== "string") {

                    throw new BadRequestError("'email' deve ser string")
                    }
                }
    
            if (password !== undefined) {
    
                if (typeof password !== "string") {
                    throw new BadRequestError("'password' deve ser string")
                    }
                }
            
                
                const emailExists: TUser | undefined = await this.userDataBase.findPostUserEmail(email)
    
                if (!emailExists) {
                    throw new BadRequestError("email incorreto")
                }
        
                if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                    throw new BadRequestError("Parâmetro 'email' inválido")
                }
    
               const passwordExists = await this.userDataBase.findPostUserPassword(password)
    
                if (!passwordExists) {
                throw new BadRequestError("Senha incorreta");
                }
            
    
            // const userInstance : LoginInputDTO = {
            //     email,
            //     password,    
            // }

            // const newUser: TUser = {  
            //     email: userInstance.getEmail(),
            //     password: userInstance.getPassword(),
            // }

            const userInstance = new User(
                passwordExists.id,
                passwordExists.name,
                passwordExists.email,
                passwordExists.password,
                passwordExists.role,
                passwordExists.created_at
            )
    
            const hashedPassaword = userInstance.getPassword()

            
            const passwordCorrect = await this.hashManager
            .compare(password, hashedPassaword)
            console.log(password);
            
            console.log(hashedPassaword);
            console.log(passwordCorrect)
            if(passwordCorrect == true){
                throw new BadRequestError("Password incorreto")
            }
            
            const newUser: TokenPayload = {
                id: userInstance.getId(),
                name: userInstance.getName(),
                role: userInstance.getRole()
            }

            const token = this.tokenManager.createToken(newUser)
    

            const output : LoginOutputDTO ={
               token
            }

            return (output)
    }

    public getUsers = async () => {
        
    
           const result = await this.userDataBase.findGetUsers()
    
            const users: User[] = result.map((result)=>
            new User(
              result.id,
              result.name,
              result.email,
              result.password,
              result.role,
              result.created_at  
            )
            )
            return({
                users: users
            })
    }
    }
