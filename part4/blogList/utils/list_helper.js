const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => blogs
  .sort((a, b) => b.likes - a.likes)
  .slice(0)
  .map((b) => ({ title: b.title, author: b.author, likes: b.likes }))[0];

const mostBlogs = (blogs) => _.chain(blogs)
  .countBy((b) => b.author)
  .toPairs()
  .map((p) => ({ author: p[0], blogs: p[1] }))
  .orderBy('blogs')
  .last()
  .value();

const mostLikes = (blogs) => _.chain(blogs)
  .groupBy((b) => b.author)
  .toPairs()
  .map((p) => ({ author: p[0], likes: _.sum(p[1].map((b) => b.likes)) }))
  .orderBy('likes')
  .last()
  .value();

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
