import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message: string = "Dados inválidos") {
    super(400, message);
  }
}
