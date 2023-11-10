import express, {Request, Response} from 'express'
import cors from 'cors'
import { Post } from './models/Post'
import { User } from './models/User'
import { UserDatabase } from './database/UserDatabase'
import { PostDB, UserDB } from './types'
import { PostDatabase } from './database/PostDatabase'
import { BaseDatabase } from './database/BaseDatabase'
import { UserController } from './controller/UserController'

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

// iniciando CRUD USERS
app.get('/users', userController.fetchUsers)
// Post new user
app.post('/users', userController.createUser)
// PUT user ja existente
app.put('/users/:id', userController.updateUser)
// Delete user existente
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findUserById(idToDelete)
        if(!userDB) {
            res.status(404)
            throw new Error('"id" nao encontrado')
        }
        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        const deletedUser: UserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt()
        }

        await userDatabase.deleteUser(deletedUser, idToDelete)
        res.status(200).send(user)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
// CRUD posts
// GET posts
app.get('/posts', async (req: Request, res: Response) => {
    try {
        const postDatabase = new PostDatabase()
        const postDB = await postDatabase.getPosts()
        const posts: Array<Post> = postDB.map(post => new Post(
            post.id,
            post.creator_id,
            post.content,
            post.likes,
            post.dislikes,
            post.created_at,
            post.updated_at
        ))

        res.status(200).send(posts)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


// Post new post
app.post('/posts', async (req: Request, res: Response) => {
    try {
        const {id, creatorId, content} = req.body
        if (typeof creatorId !== 'string') {
            res.status(400)
            throw new Error('type errado')
        }
        if (typeof content !== 'string') {
            res.status(400)
            throw new Error('type errado')
        }
        const postDatabase = new PostDatabase()
        const idToBeCreated = await postDatabase.getPostById(id)
        if(idToBeCreated) {
            res.status(400)
            throw new Error('esse id ja esta cadastrado')
        }
        const newPost = new Post(
            id,
            creatorId,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )
        const newPostDB: PostDB = {
            id: newPost.getId(),
            creator_id: newPost.getCreatorId(),
            content: newPost.getContent(),
            likes: newPost.getLikes(),
            dislikes: newPost.getDislikes(),
            created_at: newPost.getCreatedAt(),
            updated_at: newPost.getUpdatedAt()
        }

        await postDatabase.insertPost(newPostDB)
        res.status(200).send(newPost)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
// PUT Edit a post
app.put('/posts/:id', async (req: Request, res: Response) => {
    try {
        const idToBeEdited = req.params.id
        const {id, content} = req.body        

        const postDatabase = new PostDatabase()
        const postDB = await postDatabase.getPostById(idToBeEdited)
        if(!postDB) {
            res.status(400)
            throw new Error("'id' nao encontrado")
        }
        const post = new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        )
        id && post.setId(id)
        content && post.setContent(content)
        
        const newPostDb: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()

        }
        await postDatabase.updatePost(newPostDb, idToBeEdited)
        res.status(200).send(post)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})
// Delete existing post
app.delete('/post/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id
        const postDatabase = new PostDatabase()
        const postDB = await postDatabase.getPostById(idToDelete)
        if(!postDB) {
            res.status(400)
            throw new Error('id nao encontrado')
        }
        const post = new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        )
        const deletedPost: PostDB = {
            id: post.getId(),
            creator_id: post.getCreatorId(),
            content: post.getContent(),
            likes: post.getLikes(),
            dislikes: post.getDislikes(),
            created_at: post.getCreatedAt(),
            updated_at: post.getUpdatedAt()
        }

        await postDatabase.deletePost(deletedPost, idToDelete)
        res.status(200).send(post)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})