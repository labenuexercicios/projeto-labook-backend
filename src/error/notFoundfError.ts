import { baseError } from "../error/baseError";

export class notFoundError extends baseError {
    constructor(
        message: string = "resource not found."
    ) {
        super(404, message)
    }
}
