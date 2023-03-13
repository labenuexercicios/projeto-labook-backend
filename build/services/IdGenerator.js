"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
const uuid_1 = require("uuid");
class IdGenerator {
    constructor() {
        this.generate = () => {
            return (0, uuid_1.v4)();
        };
    }
}
exports.IdGenerator = IdGenerator;
