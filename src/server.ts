import express from "express";
import cors from "cors";
import router from "./router";
import cookieParser from "cookie-parser";
import { protect } from "./auth";
import prisma from "./db";
import { createNewUser, signin } from "./user";

export const app = express();
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3001", "http://localhost:3000"],
};

app.use(cors(corsOptions));
app.use(express.json());

//don't look at this
app.get("/", (req, res) => {
  console.log("hello from express!");
  res.json({ message: "this is GET /" });
});

//this is the main things
app.use(cookieParser());

//protected routes for frontend
app.use("/api", protect, router);

//these are for log/sign in
app.get("/full", async (req, res) => {
  const all = await prisma.blog.findMany();
  all.sort((a: any, b: any) => b.createdAt - a.createdAt);
  res.json(all);
});
app.post("/hey", async (req, res) => {
  const id = req.body.id;
  const blog = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });
  res.json(blog);
});
app.post("/edit", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const body = req.body.body;
  const updatedBlog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      body: body,
    },
  });
  res.json(updatedBlog);
});
app.post("/detail", async (req, res) => {
  const blog = await prisma.blog.findFirst({
    where: {
      id: req.body.id,
    },
  });
  res.json(blog);
});
app.post("/make_cookie", createNewUser);
app.post("/get_cookie", signin);
