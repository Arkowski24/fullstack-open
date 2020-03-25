const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);

  const newBlog = await blog.save();
  return response.status(201).json(newBlog);
});

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true });
  if (result === null) return response.status(404).end();
  return response.status(200).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const result = await Blog.findByIdAndRemove({ _id: id });
  if (result === null) return response.status(404).end();
  return response.status(204).end();
});

module.exports = blogRouter;
