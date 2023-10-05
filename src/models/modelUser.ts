export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) { }

    getId(): string {
        return this.id
    }

    getName(): string {
        return this.name
    }

    getEmail(): string {
        return this.email
    }

    getPassword(): string {
        return this.password
    }

    getRole(): USER_ROLES {
        return this.role
    }

    getCreatedAt(): string {
        return this.createdAt
    }

    setName(newName: string) {
        this.name = newName
    }

    setEmail(newEmail: string) {
        this.email = newEmail
    }

    setPassword(newPassword: string) {
        this.password = newPassword
    }
}