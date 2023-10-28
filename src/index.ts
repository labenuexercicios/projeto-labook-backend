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