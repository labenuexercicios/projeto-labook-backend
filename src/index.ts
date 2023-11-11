import express, { Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./router/userRouter";
import { postsRouter } from "./router/postsRouter";

const app = express();
app.use(express.json());
app.use(cors());

app.listen("3003", () => {
  console.log("listening on 3003");
});

// postman test
app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.use("/users", userRouter);
app.use("/posts", postsRouter);
