import { baseError } from '../error/baseError';

export class badRequestError extends baseError {
    constructor(
        message: string = "Invalid request."
    ) {
        super(400, message)
    }
}