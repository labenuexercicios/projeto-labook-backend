import express, { Request, Response } from 'express';
import cors from 'cors';
import { TUserDB } from './types';
import { UserDatabase } from './database/UserDatabase';
import { User } from './models/user';

const app = express();

app.use(cors());
app.use(express.json());

const userDatabase = new UserDatabase();

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" });
    } catch (error) {
        console.log(error);

        if (req.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
});

 
  
