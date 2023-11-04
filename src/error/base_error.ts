export abstract class BaseError extends Error {
    constructor(
        public statusCode: number,
        message: string = "Invalid request"
    ) {
        super(message)
    }
}