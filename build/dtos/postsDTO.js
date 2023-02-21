"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDTO = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class PostDTO {
    constructor() {
        this.getPostInput = (token) => {
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                token
            };
            return result;
        };
        this.getPostOutput = (post) => {
            const result = {
                id: post.getId(),
                content: post.getContent(),
                likes: post.getLikes(),
                dislikes: post.getDislikes(),
                createdAt: post.getCreatedAt(),
                updatedAt: post.getCreatedAt(),
                creator: post.getCreator()
            };
            return result;
        };
        this.getPostByIdInput = (token, id) => {
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                id,
                token
            };
            return result;
        };
        this.createPostInput = (content, token) => {
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser uma string");
            }
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                content,
                token
            };
            return result;
        };
        this.editPostInput = (id, content, token) => {
            if (typeof content !== "string") {
                throw new BadRequestError_1.BadRequestError("'content' deve ser uma string");
            }
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                id,
                content,
                token
            };
            return result;
        };
        this.editPostLikesInput = (id, like, token) => {
            if (typeof like !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'like' deve ser um boolean");
            }
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                id,
                like,
                token
            };
            return result;
        };
        this.deletePostInput = (id, token) => {
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                id,
                token
            };
            return result;
        };
    }
}
exports.PostDTO = PostDTO;
