import express, {Request, Response} from 'express'
import cors from 'cors'
import { Post } from './models/Post'
import { User } from './models/User'

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

const post = new Post(
    'u001',
    'u003',
    'Coe irmao',
    5,
    0,
    new Date().toISOString(),
    new Date().toISOString()
)
console.log(post)

const user = new User(
    'u003',
    'fulanoi',
    'fulano@email',
    'fluano123',
    'friend',
    new Date().toISOString()
)
console.log(user)