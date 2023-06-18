import express from 'express';
import cors from 'cors';
import { authRouter, postRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postRouter);

export { app };
