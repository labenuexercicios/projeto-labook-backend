import { BaseError } from "./base_error";

export class BadRequestError extends BaseError {
    constructor(
        message: string = "Invalid request"
    ) {
        super(400, message)
    }
}