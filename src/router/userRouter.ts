import  express  from "express"
import { UserControler } from "../Controller/UserControler"
import { UserBusiness } from "../Business/UserBusiness"
import { UserDataBase } from "../database/UserDataBase"
import { IdGenerator } from "../service/idGenerator"
import { HashManager } from "../service/hashManager"
import { TokenManager } from "../service/tokenManager"
export const userRouter = express.Router()

const userControler = new UserControler(new UserBusiness(new UserDataBase(), new IdGenerator(), new HashManager(), new TokenManager()))

userRouter.post("/signup", userControler.signup)