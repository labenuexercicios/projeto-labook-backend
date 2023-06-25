import { Request, Response } from 'express';
import Post from '../models/Post';

class PostController {
  public async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const post = new Post();
      const posts = await post.getAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { id, title, content } = req.body;
      const post = new Post();
      const newPost = await post.create({ id, title, content });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async editPost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const post = new Post();
      const updatedPost = await post.update(id, {
          title, content,
          id: ''
      });
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = new Post();
      const deleted = await post.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async likeDislikePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { like } = req.body;
      const post = new Post();
      const updatedPost = await post.likeDislike(id, like);
      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new PostController();
