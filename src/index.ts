import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// app.post("/users/signup", (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       throw new Error("Todos os campos são obrigatórios.");
//     }

//     const newUser = {
//       name,
//       email,
//       password,
//     };

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// const PORT = 3003;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

// app.post("/users/login", (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (email === "beltrana@email.com" && password === "beltrana00") {
//       res.status(200).json({
//         message: "Login bem-sucedido!",
//         user: {
//           email,
//         },
//       });
//     } else {
//       throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
//     }
//   } catch (error) {
//     res.status(401).json({
//       error: error,
//     });
//   }
// });
