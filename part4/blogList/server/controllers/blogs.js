const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

// const getUserFromToken = async (request) => {
//   const token = request.token;
//   const decodedToken = jwt.verify(token, process.env.SECRET);
//   if (!token || !decodedToken.id) {
//     return null;
//     // return response.status(401).json({ error: "token missing or invalid" });
//   }
//   return await User.findById(decodedToken.id);
// };

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 });
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
  const body = request.body;
  // const token = getTokenFrom(request);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  body.user = user;

  const blog = new Blog(body);
  const result = await blog.save();

  user.blogs = user.blogs.concat(blog._id);
  await user.save();
  
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;
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
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true },
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
