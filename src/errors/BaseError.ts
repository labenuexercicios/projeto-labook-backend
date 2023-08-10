export class BaseError extends Error {
    constructor(
      public statusCode: number,
      message: string = "Requisição Inválida"
    ){
        super(message)
    }
}

new BaseError(400, "Algo errado")