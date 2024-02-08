import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Token inválido"
    ) {
        super(401, message)
    }
}