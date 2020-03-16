const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => blogs
  .sort((a, b) => b.likes - a.likes)
  .slice(0)
  .map((b) => ({ title: b.title, author: b.author, likes: b.likes }))[0];

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
