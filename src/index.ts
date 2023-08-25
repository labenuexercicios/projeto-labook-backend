import express from 'express'
import cors from 'cors'

import { userRouter } from './router/userRouter'
import  dotenv  from 'dotenv'


dotenv.config()
const app = express()


app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

app.use("/users", userRouter)



/*  app.get("/users/login", async(req:Request, res:Response)=>{
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Dados de login inválidos' });
    }

    try {
        // Verificar se o usuário existe
        const user = await db.select('*').from('users').where('username', username).first();
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        // Verificar a senha
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        return res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Ocorreu um erro ao processar a solicitação' });
    }

}) */ 

/* app.post("/posts/create", async (req: Request, res: Response) => {});

app.get("/posts/all", async (req: Request, res: Response) => {});

app.put("/posts/:id", async (req: Request, res: Response) => {});

app.delete("/posts/:id", async (req: Request, res: Response) => {});

app.post("/like-deslike", async (req: Request, res: Response) => {}); */
