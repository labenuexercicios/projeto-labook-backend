import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { postRouter } from "./router/postRouter";
import { userRouter } from "./router/userRouter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`server on port ${Number(process.env.PORT) || 3003}`);
});

app.use("/posts", postRouter);
app.use("/users", userRouter);
