"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.BaseError = BaseError;
