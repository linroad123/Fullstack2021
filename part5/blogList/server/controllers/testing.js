const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});
router.get("/", async (request, response) => {
  response.status(200).json({ message: "TESTING MODE active" });
});

module.exports = router;
