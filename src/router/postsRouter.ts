import express from "express";
import { PostsController } from "../controller/PostsController";

export const postsRouter = express.Router();

const postsController = new PostsController();

// CRUD posts
// GET posts
postsRouter.get("/", postsController.fetchPosts);

// Post new post
postsRouter.post("/", postsController.createNewPost);
// PUT Edit a post
postsRouter.put("/:id", postsController.editPost);
// Delete existing post
postsRouter.delete("/:id", postsController.deletePost);
