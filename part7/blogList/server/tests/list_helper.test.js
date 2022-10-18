const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const listWithOneBlog = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list is calculated right", () => {
    const listWithMultipleBlogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 10,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(10);
  });
});

describe("favourite blog", () => {
  test("returns blog with most likes when there is only one blog with most likes", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 10,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "title1",
      author: "author1",
      likes: 15,
    });
  });
  test("returns blog with most likes when there are few blogs with most likes", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: "title2",
      author: "author2",
      likes: 15,
    });
  });
});


describe("most blogs", () => {
  test("author with most blogs when there is only one author with most blogs", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title11",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 10,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "author1",
      blogs: 2,
    });
  });
  test("author with most likes when there are multiple authors with most likes", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "author2",
      blogs: 2,
    });
  });
});

describe("most likes", () => {
  test("author with most likes when there is only one author with most likes", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title11",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 10,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];

    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "author1",
      likes: 30,
    });
  });
  test("author with most likes when there are multiple authors with most likes", () => {
    const blogs = [
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f8",
        title: "title1",
        author: "author1",
        url: "link1.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f9",
        title: "title2",
        author: "author2",
        url: "link2.com",
        likes: 15,
        __v: 0,
      },
      {
        id: "5a422aa71b54a676234d17f0",
        title: "title3",
        author: "author3",
        url: "link3.com",
        likes: 5,
        __v: 0,
      },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "author2",
      likes: 30,
    });
  });
});
