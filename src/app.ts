import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postRouter);

export { app };
