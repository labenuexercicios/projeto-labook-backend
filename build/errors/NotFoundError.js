"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const BaseError_1 = require("./BaseError");
class NotFoundError extends BaseError_1.BaseError {
    constructor(message = "Recurso não encontrado") {
        super(404, message);
    }
}
exports.NotFoundError = NotFoundError;