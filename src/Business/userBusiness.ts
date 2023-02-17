import { UserDataBase } from "../database/userDataBase";

export class UserBusiness {
    public async businessUsers(core: any){
        const {
            name, 
            email, 
            password 
        }  = core

        if (typeof name !== "string") {
            throw new Error("'name' deve ser uma string");
          }
        
          if (typeof email !== "string") {
            throw new Error("'email' deve ser uma string");
          }
        
          if (typeof password !== "string") {
            throw new Error("'password' deve ser uma string");
          }
          if(email.length < 1 || name.length <1){
            throw new Error("'password' deve ser uma string");
          }
          
          const userDataBase = new UserDataBase()
          const usersdb = await userDataBase.postUser(name, email, password)
          return usersdb
    }
  
}


