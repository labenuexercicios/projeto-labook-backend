import { IdGenerator } from './../service/id_generator';
import { UserBusiness } from '../business/user_business';
import { UserController } from '../controller/users_controller';
import  express  from "express"
import { UserDatabase } from '../database/users_database';
import { TokenManager } from '../service/token_manager';
import { HashManager } from '../service/hash_manager';
export const userRouter = express.Router()
const userController = new UserController( 
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager(),
        new HashManager()
    )
)



userRouter.post("/signup", userController.signup)

userRouter.post("/login", userController.login)