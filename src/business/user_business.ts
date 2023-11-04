import { UserDatabase } from "../database/users_database";
import { LoginInputDTO, LoginOutputDTO } from "../dtos/users/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/users/signup.dto";
import { BadRequestError } from "../error/bad_request_error";
import { USER_ROLES, User } from "../models/user";
import { HashManager } from "../service/hash_manager";
import { IdGenerator } from "../service/id_generator";
import { TokenManager, TokenPayload } from "../service/token_manager";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager : HashManager
  ) {}
  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const userDBExists = await this.userDatabase.findUserByEmail(email);

    if (userDBExists) {
      throw new BadRequestError("'Email' already registered");
    }

    const id = this.idGenerator.generatorId();

    const hashedPassword = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();
    await this.userDatabase.insertUser(newUserDB);

    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      name: newUser.getName(),
      role: newUser.getRole(),
    };

    const token = this.tokenManager.createToken(tokenPayload);

    const output:SignupOutputDTO = {
      message: "Registration done successfully",
      token: token,
    };

    return output;
  };

  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new BadRequestError('"email" not found');
    }

    const passwordValid = await this.hashManager.compare(
      password,
      userDB.password
    );

    if (!passwordValid) {
      throw new BadRequestError('"Email" or "Password" invalid')
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload: TokenPayload = {
      id: user.getId(),
      name: user.getName(),
      role: user.getRole(),
    };
    const token = this.tokenManager.createToken(tokenPayload);

    const output = {
      message: "Login successful",
      token: token,
    };

    return output;
  };

  
}