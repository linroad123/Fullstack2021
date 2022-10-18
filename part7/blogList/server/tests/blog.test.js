const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");
const { response, request } = require("express");
const jwt = require("jsonwebtoken");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});
describe("GET request tests", () => {
  test("all blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("all blogs have id field called 'id'", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((element) => {
      expect(element.id).toBeDefined();
    });
  });
});

describe("POST request tests", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = new User(
      { username: "admin", password: "admin" },
    );
    await user.save();
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    token = jwt.sign(userForToken, process.env.SECRET);
  });

  test("POST request to /api/blogs creates new blog entry", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "newTitle",
        author: "newAuthor",
        url: "new.link.com",
        likes: 1,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("POST request to /api/blogs with no 'likes' creates object with 'likes' set to 0", async () => {
    const user = await User.findOne({});
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "newTitle",
        author: "newAuthor",
        url: "new.link.com",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveProperty("likes", 0);
  });
  test("POST request to /api/blogs with no 'title' and 'url' parameters returns status of 400", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        likes: 15,
        author: "newAuthor",
      })
      .expect(400);
  });
  test("POST request to /api/blogs without token will return 401", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "newTitle",
        author: "newAuthor",
        url: "new.link.com",
      })
      .expect(401);
  });
});

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "root", password: "toor" });
    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "admin",
      name: "Admin",
      password: "admin",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "toor",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is shorter than 3 chars", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "r",
      name: "Superuser",
      password: "toor",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Username has to be at least 3 chars long",
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is shorter than 3 chars", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "roooo",
      name: "Superuser",
      password: "to",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "Password has to be at least 3 chars long",
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
