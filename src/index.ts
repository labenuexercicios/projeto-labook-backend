import express, { Request, Response } from 'express'
import cors from 'cors'
import { Creator, PostsDB, PostsModel, regexEmail, regexPassword, UsersDB, USER_ROLES } from './types'
import { db } from './database/knex';
import jwt from "jsonwebtoken";
import  { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'punycode';


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})
const generateToken = (userId: string) => {
    const secretKey = 'chave_secreta_do_token'; 
    const payload = { id: userId };
    const token = jwt.sign(payload, secretKey);
    return token;
  };
  const secretKey = 'chave_secreta_do_token';

const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
app.get("/ping", async (req: Request, res: Response) => {
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
})

app.post("/users/signup", async (req: Request, res: Response) => {
    try {
        const {id, name, email, password} = req.body
        
        if (!id) {
            res.status(404)
            throw new Error("ID obrigatória para cadastro")
        }
        if (typeof id !== "string") {
            res.status(400)
            throw new Error("ID precisa ser uma string")
        }
        const [userId] : UsersDB[] | undefined[] = await db("users")
            .where("id", "=", `${id}`)
        if (userId) {
            res.status(400)
            throw new Error("Já existe usuario com ID informada")
        }
        if (!name) {
            res.status(404)
            throw new Error("Name obrigatório para cadastro")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("Name precisa ser uma string")
        }
        if (!email) {
            res.status(404)
            throw new Error("Email obrigatório para cadastro")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Email precisa ser uma string")
        }
        if (!email.match(regexEmail)) {
            throw new Error("Formato de email invalido")
        }
        const [userEmail] : UsersDB[] | undefined[] = await db("users")
            .where("email", "=", `${email}`)
        if (userEmail) {
            res.status(400)
            throw new Error("Já existe usuario com email informada")
        }
        if (!password) {
            res.status(404)
            throw new Error("Password obrigatório para cadastro")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("Password precisa ser uma string")
        }
        if (!password.match(regexPassword)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }
        const role = USER_ROLES.NORMAL
        const created_at = new Date().toISOString()
        const newUser : UsersDB = {
            id,
            name,
            email,
            password,
            role,
            created_at
        }
        await db("users").insert(newUser)

        res.status(201).send(newUser)
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

app.post("/users/login", async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body
       

        if (!email) {
            res.status(404)
            throw new Error("Email obrigatório para login")
        }
        if (typeof email !== "string") {
            res.status(400)
            throw new Error("Email precisa ser uma string")
        }
        const [userExist] : UsersDB[] | undefined[] = await db("users")
            .where("email", "=", `${email}`)
        if (!userExist) {
            res.status(400)
            throw new Error("'email' não encontrado")
        }
        if (!password) {
            res.status(404)
            throw new Error("Password obrigatório para login")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("Password precisa ser uma string")
        }
        if (password !== userExist.password) {
            throw new Error("'password' invalida")
        }

        const token = generateToken(userExist.id);


        res.status(201).send(token)
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

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const allPosts : PostsDB[] = await db("posts")
        const result: PostsModel[] = []
        for(let post of allPosts) {
            const [ posts ]: PostsModel[] = await db("posts")
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at AS createdAt",
                "posts.updated_at AS updatedAt"
                )
            .where("posts.id", "=", `${post.id}`)
            const [ creator ]: Creator[] = await db("users")
            .select(
                "users.id",
                "users.name"
            )
            .where("users.id", "=", `${post.creator_id}`)
            const newPost: PostsModel = {
                ...posts,
                creator
            }
            result.push(newPost)
        }
        res.status(200).send(result)
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
app.post("/posts", async (req: Request, res: Response) => {
    try {
      const content = req.body.content;
      const token = req.headers.authorization;
  
      if (!token) {
        res.status(401).send({ message: 'Token não fornecido' });
        return;
      }
  
      const decoded = verifyToken(token);
  
      if (!decoded) {
        res.status(401).send({ message: 'Token inválido' });
        return;
      }
  
      const id = uuidv4();
      const creator_id = decoded.id;
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
  
      const newPost: PostsDB = {
        id,
        creator_id,
        content,
        likes: 0,
        dislikes: 0,
        created_at,
        updated_at
      }
  
      await db("posts").insert(newPost);
      
      res.status(201).json({ message: 'Post criado com sucesso' });
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
// app.get("/posts", async (req: Request, res: Response) => {
//     try {
//         const allPosts: PostsDB[] = await db("posts")
//             .select("id", "content", "creator_id")
//             .orderBy("created_at", "desc");

//         const result: PostsModel[] = [];
//         for (let post of allPosts) {
//             const [posts]: PostsModel[] = await db("posts")
//                 .select(
//                     "posts.id",
//                     "posts.content",
//                     "posts.likes",
//                     "posts.dislikes",
//                     "posts.created_at AS createdAt",
//                     "posts.updated_at AS updatedAt"
//                 )
//                 .where("posts.id", "=", `${post.id}`);

//             const [creator]: Creator[] = await db("users")
//                 .select("users.id", "users.name")
//                 .where("users.id", "=", `${post.creator_id}`);

//             const newPost: PostsModel = {
//                 ...posts,
//                 creator
//             };

//             result.push(newPost);
//         }

//         res.status(200).send(result);
//     } catch (error) {
//         console.log(error);

//         if (res.statusCode === 200) {
//             res.status(500);
//         }

//         if (error instanceof Error) {
//             res.send(error.message);
//         } else {
//             res.send("Erro inesperado");
//         }
//     }
// });

app.get("/posts", async (req: Request, res: Response) => {
    try {
        const result: PostsModel[] = await db("posts")
            .select(
                "posts.id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at AS createdAt",
                "posts.updated_at AS updatedAt",
                "users.id AS creator.id",
                "users.name AS creator.name"
            )
            .leftJoin("users", "posts.creator_id", "users.id");

        res.status(200).send(result);
    } catch (error) {
        console.log(error);

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Erro inesperado");
        }
    }
});

app.put("/posts/:id", async (req: Request, res: Response) => {
    try {
        const content = req.body.content
        const token = req.headers.authorization
        const id = req.params.id

        if (!id) {
            res.status(404)
            throw new Error("id não informada")
        }
        const [postExist]: PostsDB[] | undefined[] = await db("posts")
        .where("id", "=", `${id}`)
        if (!postExist) {
            res.status(400)
            throw new Error("'post' não encontrado")
        }
        if (!token) {
            res.status(404)
            throw new Error("token invalido")
        }
        if (!content) {
            res.status(404)
            throw new Error("content obrigatório para criar um post")
        }
        if (typeof content !== "string") {
            res.status(400)
            throw new Error("content precisa ser uma string")
        }
        
        const creator_id = postExist.creator_id
        const likes = postExist.likes
        const dislikes = postExist.dislikes
        const created_at = postExist.created_at
        const updated_at = new Date().toISOString()

        const updatePost: PostsDB = {
            id,
            creator_id,
            content,
            likes,
            dislikes,
            created_at,
            updated_at
        }
        await db("posts").update(updatePost).where("id", "=", `${id}`)
        res.status(201).end()
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

app.delete("/posts/:id", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const id = req.params.id

        if (!id) {
            res.status(404)
            throw new Error("id não informada")
        }
        const [postExist]: PostsDB[] | undefined[] = await db("posts")
        .where("id", "=", `${id}`)
        if (!postExist) {
            res.status(400)
            throw new Error("'post' não encontrado")
        }
        if (!token) {
            res.status(404)
            throw new Error("token invalido")
        }
        await db("posts").del().where("id", "=", `${id}`)
        res.status(201).end()
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
app.put("/posts/:id/like", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization as string;
  
      const decoded = verifyToken(token);
  
      if (!decoded) {
        res.status(401).send({ message: "Token inválido" });
        return;
      }
  
      const userId = decoded.id;
  
      const like = {
        post_id: id,
        user_id: userId,
        created_at: new Date().toISOString(),
        likes: 1
      };
  
      await db("likes_dislikes").insert({
        user_id: like.user_id,
        post_id: like.post_id,
        created_at: like.created_at,
        like: like.likes
      });
  
      res.status(200).send({ message: "Like adicionado ao post!" });
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });