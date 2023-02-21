"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, content, likes, dislikes, createdAt, updatedAt, creator) {
        this.id = id;
        this.content = content;
        this.likes = likes;
        this.dislikes = dislikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.creator = creator;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getContent() {
        return this.content;
    }
    setContent(value) {
        this.content = value;
    }
    getLikes() {
        return this.likes;
    }
    setLikes(value) {
        this.likes = value;
    }
    getDislikes() {
        return this.dislikes;
    }
    setDislikes(value) {
        this.dislikes = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    setUpdatedAt(value) {
        this.updatedAt = value;
    }
    getCreator() {
        return this.creator;
    }
    setCreator(value) {
        this.creator = value;
    }
    toBusinessModel() {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.Post = Post;