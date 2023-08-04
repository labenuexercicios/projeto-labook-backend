import { BaseError } from "./BaseError";


export class BadRequestError extends BaseError{
    constructor(
        public message: string = "Valor inválido",
        
    ){
        super(message, 400)
    }
}