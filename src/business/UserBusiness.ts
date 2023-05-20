import { UsersDatabase } from "../database/UserDatabase";
import {
  DeleteUserByIdInputDTO,
  DeleteUserByIdOutputDTO,
} from "../dto/User/deleteUserById.dto";
import {
  EditUserByIdInputDTO,
  EditUserByIdOutputDTO,
} from "../dto/User/editUserById.dto";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dto/User/getUsers.dto";
import { LoginInputDTO, LoginOutputDTO } from "../dto/User/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dto/User/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import {
  TokenPayload,
  USER_ROLES,
  User,
  UserDB,
  UserModel,
} from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private usersDatabase: UsersDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}

  /**
   * Realiza o cadastro de um novo usuário.
   * @param input - Dados necessários para o cadastro do usuário.
   * @returns Objeto contendo a mensagem de sucesso e o token de autenticação.
   * @throws ConflictError se o e-mail já estiver em uso.
   */
  public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {
    const { name, email, password } = input;

    const userEmailExist: UserDB | undefined = await this.usersDatabase.getUserByEmail(email);

    if (userEmailExist) {
      throw new ConflictError(
        "Não é possível criar mais de uma conta com o mesmo e-mail. Tente novamente."
      );
    }

    const id: string = this.idGenerator.generate();
    const hashedPassword: string = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      name,
      email,
      hashedPassword,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB: UserDB = newUser.toDBModel();
    await this.usersDatabase.insertUser(newUserDB);

    const tokenPayload: TokenPayload = newUser.toTokenPayload();
    const token = this.tokenManager.createToken(tokenPayload);
console.log(token);

    const output: SignupOutputDTO = {
      message: "Cadastro realizado com sucesso!",
      token: token,
    };

    return output;
  };

  /**
   * Realiza o login do usuário.
   * @param input - Dados necessários para o login do usuário.
   * @returns Objeto contendo a mensagem de sucesso e o token de autenticação.
   * @throws NotFoundError se o e-mail não estiver cadastrado.
   * @throws BadRequestError se a senha estiver incorreta.
   */
  public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {
    const { email, password } = input;

    const userDB: UserDB | undefined = await this.usersDatabase.getUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError(
        "E-mail não encontrado. Cadastre-se e tente novamente."
      );
    }

    const hashedPassword: string = userDB.password;
    const isPasswordCorrect: boolean = await this.hashManager.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      throw new BadRequestError(
        "'E-mail' ou 'Senha' incorretos. Tente novamente."
      );
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload: TokenPayload = user.toTokenPayload();
    const token = this.tokenManager.createToken(tokenPayload);
console.log(token);

    const output: LoginOutputDTO = {
      message: "Login realizado com sucesso!",
      token: token,
    };

    return output;
  };

  /**
   * Obtém a lista de usuários do sistema.
   * @param input - Filtros e informações de autenticação.
   * @returns Lista de usuários.
   * @throws UnauthorizedError se o token de autenticação for inválido.
   * @throws ForbiddenError se o usuário não tiver permissão para acessar a lista de usuários.
   * @throws NotFoundError se não houver usuários cadastrados no banco de dados.
   */
  public getUsers = async (input: GetUsersInputDTO): Promise<GetUsersOutputDTO> => {
    const { query, token } = input;

    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      throw new ForbiddenError(
        "Somente ADMINS podem acessar esse recurso."
      );
    }

    const usersDB: UserDB[] = await this.usersDatabase.getUsers(query);

    const users: UserModel[] = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.name,
        userDB.email,
        userDB.password,
        userDB.role,
        userDB.created_at
      );
      return user.toBusinessModel();
    });

    if (!users.length) {
      throw new NotFoundError("Nenhum usuário cadastrado no banco de dados.");
    }

    const output: GetUsersOutputDTO = users;
    return output;
  };

  /**
   * Edita os dados de um usuário pelo seu ID.
   * @param input - Dados necessários para a edição do usuário.
   * @returns Objeto contendo a mensagem de sucesso.
   * @throws UnauthorizedError se o token de autenticação for inválido.
   * @throws ForbiddenError se o usuário não tiver permissão para editar o perfil.
   * @throws NotFoundError se o usuário não existir no banco de dados.
   * @throws BadRequestError se nenhum campo for informado para atualização.
   */
  public editUserById = async (
    input: EditUserByIdInputDTO
  ): Promise<EditUserByIdOutputDTO> => {
    const { idToEditUser, name, email, password, token } = input;

    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== idToEditUser) {
        throw new ForbiddenError(
          "Somente o próprio usuário pode editar a própria conta. Caso não tenha acesso à sua conta, entre em contato com nosso suporte."
        );
      }
    }

    const userDB: UserDB | undefined = await this.usersDatabase.getUserById(idToEditUser);

    if (!userDB) {
      throw new NotFoundError("Usuário não existe no nosso banco de dados.");
    }

    if (!name && !email && !password) {
      throw new BadRequestError(
        "É necessário informar ao menos um campo para atualizar."
      );
    }

    const user = new User(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    let hashedPassword: string | undefined;

    if (password) {
      hashedPassword = await this.hashManager.hash(password);
    }

    user.NAME = name || userDB.name;
    user.EMAIL = email || userDB.email;
    user.PASSWORD = hashedPassword || userDB.password;

    const updatedUserDB: UserDB = user.toDBModel();
    await this.usersDatabase.editUserById(userDB.id, updatedUserDB);

    const output: EditUserByIdOutputDTO = {
      message: "Cadastro atualizado com sucesso!",
    };

    return output;
  };

  /**
   * Deleta um usuário pelo seu ID.
   * @param input - Dados necessários para a exclusão do usuário.
   * @returns Objeto contendo a mensagem de sucesso.
   * @throws UnauthorizedError se o token de autenticação for inválido.
   * @throws ForbiddenError se o usuário não tiver permissão para excluir o perfil.
   * @throws NotFoundError se o usuário não existir no banco de dados.
   */
  public deleteUserById = async (
    input: DeleteUserByIdInputDTO
  ): Promise<DeleteUserByIdOutputDTO> => {
    const { idToDelete, token } = input;

    const payload: TokenPayload | null = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== idToDelete) {
        throw new ForbiddenError(
          "Somente o próprio usuário pode excluir a própria conta. Caso não tenha acesso à sua conta, entre em contato com nosso suporte."
        );
      }
    }

    const userDB: UserDB | undefined = await this.usersDatabase.getUserById(idToDelete);

    if (!userDB) {
      throw new NotFoundError("Usuário não existe no nosso banco de dados.");
    }

    await this.usersDatabase.deleteUserById(idToDelete);

    const output: DeleteUserByIdOutputDTO = {
      message: "Cadastro excluído com sucesso!",
    };

    return output;
  };
}
