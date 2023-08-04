import { BaseError } from "./BaseError";
export class ForbiddenError extends BaseError {
    constructor(
        message: string = "Usuário não autenticado" 
    ) {
        super(403, message)
    }
}