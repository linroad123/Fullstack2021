let _ = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    let average = 0;
    blogs.forEach((blog) => {
      average += blog.likes;
    });
    return average / blogs.length;
  }
};

const favoriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
  return _.pick(sorted[0], ["title", "author", "likes"]);
};

const mostBlogs = (blogs) => {
  const authorBlogs = _.countBy(blogs, 'author');
  let blogList = [];
  Object.keys(authorBlogs).forEach((key) => {
    blogList.push({
      author: key,
      blogs: authorBlogs[key]
    })
  });
  return blogList
    .sort((a, b) => (a.blogs > b.blogs) ? -1 : 1)[0];
};

const mostLikes = (blogs) => {
  return _(blogs)
    .groupBy("author")
    .map((objs, key) => {
      return {
        "author": key,
        "likes": _.sumBy(objs, "likes"),
      };
    })
    .value()
    .sort((a, b) => (a.likes > b.likes) ? -1 : 1)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
