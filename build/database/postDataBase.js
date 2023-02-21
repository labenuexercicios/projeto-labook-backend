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
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS);
            return result;
        });
    }
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .where({ id });
            return result;
        });
    }
    createPost(newPostDB) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .insert(newPostDB);
        });
    }
    updatePostById(updatedPostDB, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .update(updatedPostDB)
                .where({ id });
        });
    }
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(PostDatabase.TABLE_POSTS)
                .del()
                .where({ id });
        });
    }
}
exports.PostDatabase = PostDatabase;
PostDatabase.TABLE_POSTS = "posts";
