import express, {Request, Response} from 'express'
import cors from 'cors'
import { Post } from './models/Post'
import { User } from './models/User'
import { UserDatabase } from './database/UserDatabase'
import { PostDB, UserDB } from './types'
import { PostDatabase } from './database/PostDatabase'
import { BaseDatabase } from './database/BaseDatabase'
import { UserController } from './controller/UserController'
import { PostsController } from './controller/PostsController'

const app = express()
app.use(express.json())
app.use(cors())

app.listen('3003', () => {
    console.log('listening on 3003')
})

// postman test
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')
})
const userController = new UserController()
const postsController = new PostsController()

// iniciando CRUD USERS
app.get('/users', userController.fetchUsers)
// Post new user
app.post('/users', userController.createUser)
// PUT user ja existente
app.put('/users/:id', userController.updateUser)
// Delete user existente
app.delete('/users/:id', userController.deleteUser)
// CRUD posts
// GET posts
app.get('/posts', postsController.fetchPosts)


// Post new post
app.post('/posts', postsController.createNewPost)
// PUT Edit a post
app.put('/posts/:id', postsController.editPost)
// Delete existing post
app.delete('/posts/:id', postsController.deletePost)