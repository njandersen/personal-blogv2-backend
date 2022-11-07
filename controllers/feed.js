const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Get all posts
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

// Get one post
exports.getPost = async (req, res, next) => {
  // const { id } = req.params;
  const postId = req.params.pid;

  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
  });
  res.status(200).json(post);
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
