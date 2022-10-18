const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "title1",
    author: "author1",
    url: "link1.com",
    likes: 15,
  },
  {
    title: "title11",
    author: "author1",
    url: "link1.com",
    likes: 15,
  },
  {
    title: "title2",
    author: "author2",
    url: "link2.com",
    likes: 10,
  },
  {
    title: "title3",
    author: "author3",
    url: "link3.com",
    likes: 5,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon", date: new Date() });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
