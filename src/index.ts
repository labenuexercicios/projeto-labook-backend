import express, {Request, Response} from 'express'
import cors from 'cors'
import { Post } from './models/Post'
import { User } from './models/User'
import { UserDatabase } from './database/UserDatabase'
import { TUserDB } from './types'

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

// iniciando CRUD USERS
app.get('/users', async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string
        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)
        const users: Array<User> = usersDB.map(userDB => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        ))
        res.status(200).send(users)
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
// Post new user
app.post('/users', async (req: Request, res: Response) => {
    try {
        const {id, name, email, password, role } = req.body
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser string")
        }
        if (typeof role !== 'string') {
            res.status(400)
            throw new Error("'role' deve ser string")
        }
        const userDatabase = new UserDatabase()
        const userDBExists = await userDatabase.findUserById(id)
        if(userDBExists) {
            res.status(400)
            throw new Error("o 'id' ja esta sendo utilizado")
        }
        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
            new Date().toISOString()
        )
        const newUserDB: TUserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await userDatabase.insertUser(newUserDB)
        res.status(200).send(newUser)
        
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
// PUT user ja existente
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id
        const {name, email, password, role} = req.body
        
        const userDatabase = new UserDatabase()
        const userDB = await userDatabase.findUserById(idToEdit)
        if (!userDB) {
            res.status(400)
            throw new Error("'id' nao encontrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )
        name && user.setName(name)
        email && user.setEmail(email)
        password && user.setPassword(password)
        role && user.setRole(role)

        const userEdited: TUserDB = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
            created_at: user.getCreatedAt()
        }
        await userDatabase.updateUser(userEdited, idToEdit)
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
        const deletedUser: TUserDB = {
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