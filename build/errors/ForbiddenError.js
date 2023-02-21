"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const BaseError_1 = require("./BaseError");
class ForbiddenError extends BaseError_1.BaseError {
    constructor(message = "Usuário não autenticado") {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
