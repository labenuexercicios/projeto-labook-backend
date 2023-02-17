export abstract class BaseError extends Error { //configurar o erro do jeito que queremos

    constructor(
        public statusCode: number, 
        message: string 
    ) {
        super(message) 
    }
}

import {NotFoundError } from "./NotFoundError";

export class BadRequesteError extends BaseError { 

    constructor(
        message:string = "BadRequest - ERROR 400 - Requisição inválida" 
    )
    {
        super(400, message)
      
    }

}