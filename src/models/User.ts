export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}


export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private role: string,
    private createdAt: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public setId(newValue: string) {
    this.id = newValue;
  }

  public getName(): string {
    return this.name;
  }
  public setName(newValue: string) {
    this.name = newValue;
  }

  public getEmail(): string {
    return this.email;
  }
  public setEmail(newValue: string) {
    this.email = newValue;
  }

  public getPassword(): string {
    return this.password;
  }
  public setPassword(newValue: string) {
    this.password = newValue;
  }

  public getRole(): string {
    return this.role;
  }
  public setRole(newValue: string) {
    this.role = newValue;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }
  public setCreatedAt(newValue: string) {
    this.createdAt = newValue;
  }
}
