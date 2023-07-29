import express, {Request, Response} from 'express';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});

app.get('/ping',(req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
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
});