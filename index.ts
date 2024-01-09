import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  console.log("PORT not set");
  process.exit(1);
}

const app: Express = express();

// session final-3
// Task: add cors() middleware
//@ts-ignore
app.use(cors());
app.use(express.json());

// session final-3
// Task: add express.json() middleware
app.use(express.json());

// session final-3
// Task: add a GET endpoint at path "/ready" just to test the server and confirm it is working
app.get("/ready", (req, res) => {
  res.status(200).send("OK");
});

app.post("/users/create", (req, res) => {
  const { name, email } = req.body;
  res.status(200).send("Recieved");
  console.log(name , email);
});
// session final-3
// Task: setup prisma schema allowing for:
// - creating posts
// - searching posts
// Hint: find the documentation and follow the steps outlined for setting up prisma
// Hint: you will also need a MySQL database

// session final-3
// Task: add a simple POST endpoint to create posts

// session final-3
// Task: add a simple GET endpoint to search posts

// start server
app.listen(process.env.PORT, () => {
  console.log(
    `🚀🚀🚀 Server is running at https://localhost:${process.env.PORT}`
  );
});
