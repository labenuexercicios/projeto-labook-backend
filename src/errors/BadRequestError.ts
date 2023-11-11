import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Requisicao invalida") {
    super(400, message);
  }
}
