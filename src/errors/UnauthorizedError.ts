import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(
        message: string = "Invalid token"
    ) {
        super(401, message)
    }
}