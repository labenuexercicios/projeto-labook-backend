import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Recurso nao encontrado") {
    super(404, message);
  }
}
