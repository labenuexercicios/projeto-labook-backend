import { Request, Response } from 'express';
import Post from '../models/Post';

class PostController {
  public async getPosts(req: Request, res: Response): Promise<void> {
    // Lógica para obter os posts
    const posts = await Post.getAll(); // Exemplo: método assíncrono para obter todos os posts
    res.json(posts);
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    // Lógica para criar um novo post
    const { title, content } = req.body;
    const post = new Post(title, content); // Exemplo: criando uma nova instância de post
    await post.save(); // Exemplo: salvando o post de forma assíncrona
    res.json(post);
  }

  public async editPost(req: Request, res: Response): Promise<void> {
    // Lógica para editar um post existente
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.getById(id); // Exemplo: método assíncrono para obter um post pelo ID
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      post.title = title; // Exemplo: atualizando o título do post
      post.content = content; // Exemplo: atualizando o conteúdo do post
      await post.save(); // Exemplo: salvando as alterações no post de forma assíncrona
      res.json(post);
    }
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    // Lógica para excluir um post existente
    const { id } = req.params;
    const post = await Post.getById(id); // Exemplo: método assíncrono para obter um post pelo ID
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      await Post.deleteById(id); // Exemplo: método assíncrono para excluir um post pelo ID
      res.json({ message: 'Post deleted successfully' });
    }
  }

  public async likeDislikePost(req: Request, res: Response): Promise<void> {
    // Lógica para dar ou remover o like em um post
    const { id } = req.params;
    const post = await Post.getById(id); // Exemplo: método assíncrono para obter um post pelo ID
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      post.toggleLike(); // Exemplo: método para alternar o estado do like no post
      await post.save(); // Exemplo: salvando as alterações no post de forma assíncrona
      res.json(post);
    }
  }
}

export default PostController;
