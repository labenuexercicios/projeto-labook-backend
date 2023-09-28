import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    constructor(message: string = "Acesso não autorizado, apenas usuários logados podem acessar este recurso."){
        super(401, message)
    }
}