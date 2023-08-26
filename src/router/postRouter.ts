import express from "express"
import { PostController } from "../controller/PostController";

import { PostDatabase } from "../database/PostDatabase";

import { IdGenerator } from "../services/IdGenerator";
import { UserDatabase } from "../database/UserDatabase";
import { TokenMananger } from '../services/TokenManager';
import { PostBusiness } from '../business/PostBusiness';

export const postRouter = express.Router()
const postController = new PostController(
    new PostBusiness(
        new UserDatabase(),
        new PostDatabase(),
        new TokenMananger(),
        new IdGenerator()
    )
);

//getAllPosts
postRouter.get('/', postController.getAllPosts);
//CreatePost
postRouter.post('/', postController.createPost);
//editPost
postRouter.put('/:id', postController.editPost);
//deletePost
postRouter.delete('/:id', postController.deletePost);
//likeDislike
postRouter.put('/:id/like', postController.likeDislikePost);