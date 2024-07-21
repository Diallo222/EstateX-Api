import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        user: {
          select: { username: true, avatar: true },
        },
        postDetail: true,
      },
    });
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const currentUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: currentUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json({ newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.userId;
  const body = req.body;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
    });
    if (post.userId !== currentUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await prisma.post.update({
      where: { id: id },
      data: { ...body },
    });
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const currentUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
    });
    if (post.userId !== currentUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await prisma.post.delete({
      where: { id: id },
    });
    res.status(200).json({ message: "post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
