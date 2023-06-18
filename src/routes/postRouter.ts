import express from 'express';
import { PostController } from '../controllers';
import { authMiddleware } from '../middlewares';

const postRouter = express.Router();

// Rotas protegidas
postRouter.use(authMiddleware.authenticate); // Middleware para autenticação

postRouter.get('/', PostController.getPosts);
postRouter.post('/', PostController.createPost);
postRouter.put('/:id', PostController.editPost);
postRouter.delete('/:id', PostController.deletePost);
postRouter.put('/:id/like', PostController.likeDislikePost);

export default postRouter;
