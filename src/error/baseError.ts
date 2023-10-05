export abstract class baseError extends Error{
    constructor(
        public statusCode: number,
        message: string
    ){
        super(message)
    }
}