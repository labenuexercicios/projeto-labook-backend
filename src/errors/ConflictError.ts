import { BaseError } from "./BaseError";


export class ConflictError extends BaseError {
    constructor(
        public message: string = "Duplicidade",

    ) {
        super(message, 409)
    }
}