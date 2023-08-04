
import { BaseError } from "./BaseError";


export class NotFoundError extends BaseError {
    constructor(
        public message: string = "Não encontrado",

    ) {
        super(message, 404)
    }
}