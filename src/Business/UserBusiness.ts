import { BadRequestError } from "../Errors/BadRequestError";
import { UserDataBase } from "../database/UserDataBase";
import { SignupInputDto, SignupOutputDto } from "../dtos/Users/signup.dto";
import { USER_ROLES } from "../models/User";
import { Users } from "../models/User";
import { HashManager } from "../service/hashManager";
import { IdGenerator } from "../service/idGenerator";
import { TokenManager } from "../service/tokenManager";

export class UserBusiness {
  constructor(
    private userDataBase: UserDataBase,
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}
  public signup = async (input: SignupInputDto) => {
    const { name, email, password } = input;
    const userDbExist = await this.userDataBase.findByEmail(email);

    if (userDbExist) {
      throw new BadRequestError("Usuário já existente");
    }

    const id = this.idGenerator.generate();
    const hashPassword = await this.hashManager.hash(password);
    const newUser = new Users(
        id,
        name,
        email,
        hashPassword,
        USER_ROLES.NORMAL,
        new Date().toISOString()
    ) 
    const newUserDb = newUser.toDBModel()
    await this.userDataBase.signup(newUserDb)

    const token = this.tokenManager.createToken({
        id: newUser.getId(),
        name: newUser.getName(),
        role: newUser.getRole()

    })    
    const output: SignupOutputDto = {token} 
    return output


  };
}
