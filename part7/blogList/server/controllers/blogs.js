const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUserFromToken = async (request) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return null;
    // return response.status(401).json({ error: "token missing or invalid" });
  }
  return await User.findById(decodedToken.id);
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  let body = request.body;

  const user = await getUserFromToken(request);
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  body.user = user;

  const blog = new Blog(body);
  const result = await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = await getUserFromToken(request);
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: "wrong user" });
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
    author: body.author,
    title: body.title,
    url: body.url,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});


module.exports = blogsRouter;
