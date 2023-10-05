import { baseError } from "../error/baseError";

export class conflictError extends baseError{
    constructor(
        message: string = "conflicting request."
    ) {
        super(409, message)
    }
}