const _ = require('lodash');

const initalBlogs = [{
  _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0,
}, {
  _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0,
}, {
  _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0,
}, {
  _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0,
}, {
  _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0,
}, {
  _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0,
},
];

const newBlog = {
  title: 'Example title',
  author: 'Example author',
  url: 'blog.example.com',
};

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
  initalBlogs,
  newBlog,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
