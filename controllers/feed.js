const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getPosts = async (req, res, next) => {
  const { searchString, skip, take, orderBy } = req.query;

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: orderBy || undefined,
    },
  });

  res.status(200).json(posts);
};

exports.getPost = (req, res, next) => {
  // Need Models
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post Created Successsfully",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
