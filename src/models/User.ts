export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private created_at: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public setId(value: string): void {
    this.id = value;
  }
  public getName(): string {
    return this.name;
  }
  public setName(value: string): void {
    this.name = value;
  }
  public getEmail(): string {
    return this.email;
  }
  public setEmail(value: string): void {
    this.email = value;
  }
  public getPassord(): string {
    return this.password;
  }
  public setPassword(value: string): void {
    this.password = value;
  }
  public getCreatedAt(): string {
    return this.created_at;
  }
  public setCreatedAt(value: string): void {
    this.created_at = value;
  }
}
