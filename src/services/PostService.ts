import { v4 as uuidv4 } from 'uuid';
import { Post, USER_ROLES } from '../types';
import { PostRepository } from '../repositories';

class PostService {
  static async createPost(content: string, creatorId: string): Promise<Post> {
    const id = uuidv4();
    const post = new Post(id, content, creatorId);
    const createdPost = await PostRepository.create(post);
    return createdPost;
  }

  static async editPost(
    id: string,
    content: string,
    userId: string,
    userRole: USER_ROLES
  ): Promise<Post | null> {
    const post = await PostRepository.findById(id);

    if (!post) {
      return null;
    }

    if (post.creatorId !== userId && userRole !== USER_ROLES.ADMIN) {
      return null;
    }

    post.content = content;
    const updatedPost = await PostRepository.update(post);
    return updatedPost;
  }

  static async deletePost(
    id: string,
    userId: string,
    userRole: USER_ROLES
  ): Promise<boolean> {
    const post = await PostRepository.findById(id);

    if (!post) {
      return false;
    }

    if (post.creatorId !== userId && userRole !== USER_ROLES.ADMIN) {
      return false;
    }

    await PostRepository.delete(id);
    return true;
  }

  static async likeDislikePost(
    id: string,
    userId: string,
    like: boolean
  ): Promise<Post | null> {
    const post = await PostRepository.findById(id);

    if (!post) {
      return null;
    }

    if (post.creatorId === userId) {
      return null;
    }

    if (like) {
      if (post.likes.includes(userId)) {
        post.likes = post.likes.filter((id) => id !== userId);
      } else {
        post.likes.push(userId);
        post.dislikes = post.dislikes.filter((id) => id !== userId);
      }
    } else {
      if (post.dislikes.includes(userId)) {
        post.dislikes = post.dislikes.filter((id) => id !== userId);
      } else {
        post.dislikes.push(userId);
        post.likes = post.likes.filter((id) => id !== userId);
      }
    }

    const updatedPost = await PostRepository.update(post);
    return updatedPost;
  }
}

export default PostService;
