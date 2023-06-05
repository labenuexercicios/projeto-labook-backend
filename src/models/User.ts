export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN"
} 

export interface TokenPayload {
  id: string,
  name: string,
  role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel{
  id: string,
  name: string,
  email: string,
  role: USER_ROLES,
  createdAt: string
}

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private createdAt: string
  ){ }

  public  getId() {
    return this.id;
  }
  public setId(id: string): void {
    this.id = id;
  }
  public  getName() {
    return this.name;
  }
  public setName( name: string): void {
    this.name = name;
  }
  public  getEmail() {
    return this.email;
  }
  public setEmail( email: string): void {
    this.email = email;
  }
  public  getPassword() {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }
  public  getRole() {
    return this.role;
  }
  public setRole( role: USER_ROLES): void {
    this.role = role;
  }
  public  getCreated_at() {
    return this.createdAt;
  }
  public setCreated_at(created_at: string): void {
    this.createdAt = created_at;
  }

  public toDBModel(): UserDB{
    return{
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      created_at: this.createdAt
    }
  }

  public toUserModel(): UserModel {
    return{
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    }
  }

}