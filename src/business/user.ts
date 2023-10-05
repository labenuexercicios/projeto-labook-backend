import { hashManager } from "../service/hashManager"
import { generatorId } from "../service/generatorId"
import { userDB } from "../types"
import { userCreateInputDTO, userCreateOutputDTO } from "../endpoints/signup"
import { userGetAllOutputDTO } from "../endpoints/getAllUsers"
import { userLoginInputDTO, userLoginOutputDTO } from "../endpoints/userLogin"
import { conflictError } from "../error/confkictError"
import { userDatabase } from "../database/userData"
import { USER_ROLES, User } from "../models/modelUser"
import { tokenManager, tokenPayload } from "../service/tokenManager"


export class userBusiness {
    constructor(
        private userDatabase: userDatabase,
        private generatorId: generatorId,
        private tokenManager: tokenManager,
        private hashManager: hashManager
    ) { }

    public create = async (input: userCreateInputDTO): Promise<userCreateOutputDTO> => {
        const { name, email, password } = input

        const id = this.generatorId.generate()

        const hashedPassword = await this.hashManager.hash(password)       

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        const newuserDB: userDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: USER_ROLES.NORMAL,
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.creatUser(newuserDB)

        const tokenPayload: tokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: userCreateOutputDTO = {
            message: "created",
            token: token
        }
        return output
    }

    public getAllUsers = async (): Promise<userGetAllOutputDTO[]> => {
        const result = await this.userDatabase.findUser()

        const output: userGetAllOutputDTO[] = result.map((user)=>({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createAt: user.created_at       
        }))

        return output
    }

    public login = async (input: userLoginInputDTO): Promise<userLoginOutputDTO> => {

        const { email, password } = input


        const user = await this.userDatabase.findUserByEmail(email)

        if (!user) {
            throw new conflictError("User email not found.")
        }

        const isPasswordValid = await this.hashManager.compare(password, user.password)

        if (!isPasswordValid) {
            throw new conflictError("incorrect password.")
        }

        const tokenPayload: tokenPayload = {
            id: user.id,
            name: user.name,
            role: user.role
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output: userLoginOutputDTO = {
            token: token
        }

        return output

    }
}