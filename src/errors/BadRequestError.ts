import { BaseError } from "./BaseErrors";

export class BadRequestError extends BaseError{
    constructor(
        message: string = "Requisição invalida"
    ){
        super(400, message)
    }
}