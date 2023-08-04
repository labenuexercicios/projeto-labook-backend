
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: string,
        private createdAt: string
    ) { }

    public getId = (): string => {
        return this.id
    }
    public getName = (): string => {
        return this.name
    }
    public getEmail = (): string => {
        return this.email
    }
    public getPassword = (): string => {
        return this.password
    }
    public getRole = (): string => {
        return this.role
    }
    public getCreatedAt = (): string => {
        return this.createdAt
    }
    public setName = (newName: string): void => {
        this.name = newName
    }

    public setPassword = (newPassword: string): void => {
        this.password = newPassword
    }

    public setRole = (newRole: string): void => {
        this.role = newRole
    }

}