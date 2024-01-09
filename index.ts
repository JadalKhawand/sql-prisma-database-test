import express, { Express, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT not set");
  process.exit(1);
}

const app: Express = express();
const prisma = new PrismaClient();

// session final-3
// Task: add cors() middleware
//@ts-ignore
app.use(cors());
app.use(express.json());

// session final-3
// Task: add express.json() middleware
app.use(express.json());

app.get("/ready", (req, res) => {
  res.status(200).send("OK");
});

app.post("/users/create", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  console.log(user);
  res.status(200).json(user);
});

app.post("/posts/create", async (req, res) => {
  const { title, content, published, authorId } = req.body;
  const post = await prisma.post.create({
    data: {
      title: title,
      content: content,
      published: published,
      authorId: authorId,
    },
  });
  res.json(post);
});

app.get("/user/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const user = await prisma.user.findUnique({
    where: {
      id: user_id, // where column row id = id
    },
    include: {
      posts: true,
    },
  });
  res.json(user);
});

app.get("/posts/published", async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
  });
  res.json(posts);
});

app.put("/users/:id", async (req, res) => {
  const user_id = parseInt(req.params.id);
  const name = req.body.name;
  const updateUser = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: name,
    },
  });
  res.json(updateUser);
});

app.listen(process.env.PORT, () => {
  console.log(
    `🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`
  );
});
