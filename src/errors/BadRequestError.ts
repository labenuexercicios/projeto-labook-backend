import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    constructor(message: string = "Requisição Inválida"){
        super(400, message)
    }
}