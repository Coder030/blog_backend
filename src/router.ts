import { Router } from "express";
import prisma from "./db";
import { log } from "console";

const router = Router();
router.get("/me", async (req, res) => {
  // @ts-ignore
  res.json({ message: req.user });
});
// const objects = [
//   { createdOn: new Date("2023-03-08") },
//   { createdOn: new Date("2023-03-09") },
//   { createdOn: new Date("2023-03-07") },
// ];
// objects.sort((a: any, b: any) => b.createdOn - a.createdOn);
// console.log(objects);
router.post("/my", async (req, res) => {
  const id = req.body.id;
  const user = await prisma.user.findFirst({
    where: {
      id: id,
    },
    include: {
      blogs: true,
    },
  });

  const all = user.blogs;
  all.sort((a: any, b: any) => b.createdAt - a.createdAt);
  res.json(all);
});
router.delete("/del/:id", async (req, res) => {
  const id = req.params.id;
  const del = await prisma.blog.delete({
    where: {
      id: id,
    },
  });
  res.json(del);
});
router.post("/post", async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const madeBy = req.body.made;
  const id = req.body.id;
  const blog = await prisma.blog.create({
    data: {
      title: title,
      body: body,
      madeBy: madeBy,
    },
  });
  const yeah = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      blogs: {
        connect: {
          id: blog.id,
        },
      },
    },
    include: {
      blogs: true,
    },
  });
  res.json(yeah.blogs);
});
export default router;
