"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const post_1 = require("../models/post");
class PostBusiness {
    constructor(postDatabase, userDatabase, postDTO, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.userDatabase = userDatabase;
        this.postDTO = postDTO;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
    }
    getPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const postsDB = yield this.postDatabase.findPosts();
            const usersDB = yield this.userDatabase.findUsers();
            const output = postsDB.map(postDB => {
                const post = new post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, getCreator(postDB.creator_id));
                return this.postDTO.getPostOutput(post);
            });
            function getCreator(userId) {
                const user = usersDB.find(userDB => userDB.id === userId);
                return {
                    id: user.id,
                    name: user.name
                };
            }
            return output;
        });
    }
}
exports.PostBusiness = PostBusiness;
