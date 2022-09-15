const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs");
    // , { url: 1, title: 1, author: 1}
  // response.json(users.map((u) => u.toJSON()));
  response.json(users);
  console.log(users)
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const username = body.username;
  const password = body.password;

  // console.log(typeof username)
    // console.log(body)
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (username.length < 3) {
    return response.status(400).json(
      { error: "Username has to be at least 3 chars long" },
    );
  } else if (password.length < 3) {
    return response.status(400).json(
      { error: "Password has to be at least 3 chars long" },
    );
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});

module.exports = usersRouter;
