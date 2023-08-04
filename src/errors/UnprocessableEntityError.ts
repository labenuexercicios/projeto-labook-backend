
import { BaseError } from "./BaseError";


export class UnprocessableEntityError extends BaseError{
    constructor(
        public message: string = "Valor Vazio",
        
    ){
        super(message, 422)
    }
}