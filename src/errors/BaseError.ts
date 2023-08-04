
export abstract class BaseError extends Error {

    constructor(
        public message: string = "Requisição inválida",
        public statusCode: number
    ) {
        super(message)
    }
}