import { UserDataBase } from "../database/UserDataBase";
import { BadRequestError } from "../errors/BadRequestError";
import { TUser } from "../models/types";
import { User } from "../models/User";

export class UserBusiness {
    public createUsers = async (input:any) => {
    
            const { id, name, email, password, role, created_at } = input
    
            if (!id || !name || !email || !password || !role) {
                throw new BadRequestError("Dados inválidos")
            }
    
            if (id !== undefined) {
    
                if (typeof id !== "string") {
                    throw new BadRequestError("'id' deve ser string")
                   }
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
            
            if (role !== undefined) {
    
                 if (typeof role !== "string") {  
                    throw new BadRequestError("'role' deve ser string")
                    }
                }
    
    
            const userDataBase = new UserDataBase()
    
            const userExists = await userDataBase.findPostUser(id)
    
    
            if (userExists) {
                throw new BadRequestError("'id' do usuário já existente");
            }
    
            const emailExists = await userDataBase.findPostUserEmail(email)
    
            if (emailExists) {
                throw new BadRequestError("'email' do usuário já existe")
            }
    
            if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                throw new BadRequestError("Parâmetro 'email' inválido")
            }
    
            const userInstance = new User(
                id,
                name,
                email,
                password,
                role,
                new Date().toISOString()
            )
    
    
            const newUser: TUser = {
                id: userInstance.getId(),
                name: userInstance.getName(),
                email: userInstance.getEmail(),
                password: userInstance.getPassword(),
                role: userInstance.getRole(),
                created_at: userInstance.getCreatedAt()
            }
    
            await userDataBase.insertPostUser(newUser)

            const output ={
                message: "Cadastro realizado com sucesso",
                user: userInstance
            }

            return (output)
    }

    public createUsersLogin = async (input: any) => {
        
        const { email, password} = input;
    
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
            
                const userDataBase = new UserDataBase()
                
                const emailExists = await userDataBase.findPostUserEmail(email)
    
                if (!emailExists) {
                    throw new BadRequestError("email incorreto")
                }
        
                if (!email.match(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g)) {
                    throw new BadRequestError("Parâmetro 'email' inválido")
                }
    
               const passwordExists = await userDataBase.findPostUserPassword(password)
    
                if (!passwordExists) {
                throw new BadRequestError("Senha incorreta");
                }
            
    
            const userInstance = {
                email,
                password,    
            }


            // const newUser: TUser = {  
            //     email: userInstance.getEmail(),
            //     password: userInstance.getPassword(),
            // }
    
            // await userDataBase.findGetUsers(newUser)

            const output ={
                message: "Login realizado com sucesso",
                user: userInstance
            }

            return (output)
    }

    public getUsers = async () => {
        const userDataBase = new UserDataBase()
    
           const result = await userDataBase.findGetUsers()
    
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
