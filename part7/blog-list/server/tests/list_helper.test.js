const listHelper = require('../utils/list_helper');

const blogs = listHelper.initalBlogs;
const listWithOneBlog = [blogs[1]];

test('dummy returns one', () => {
  const result = listHelper.dummy([]);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    const blog = listWithOneBlog[0];
    expect(result).toEqual({ title: blog.title, author: blog.author, likes: blog.likes });
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 });
  });
});

describe('author with the most blogs', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals to one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('author with the most likes', () => {
  test('of empty list is undefined', () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(undefined);
  });

  test('when list has only one blog equals to the likes of it', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});
