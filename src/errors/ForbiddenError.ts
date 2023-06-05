import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string = "Token válido, mas sem permissões suficientes"
    ) {
        super(403, message)
    }
}