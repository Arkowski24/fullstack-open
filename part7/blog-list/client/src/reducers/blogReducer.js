import blogsService from '../services/blogs';
import { setNotification } from './notificationReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOG_INIT':
    return action.data;
  case 'BLOG_ADD':
    return state.concat(action.data);
  case 'BLOG_MODIFY':
    return state.map(b => b.id === action.data.id ? action.data : b);
  case 'BLOG_DELETE':
    return state.filter(b => b.id !== action.data.id);
  default:
    return state;
  }
};

export const initBlogs = () => {
  return async (dispatch, getState) => {
    const { user } = getState();
    if(!user) return;
    blogsService.setToken(user.token);

    const blogs = await blogsService.getAll();
    dispatch({ type: 'BLOG_INIT', data: blogs });
  };
};

export const addBlog = (title, author, url) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      blogsService.setToken(user.token);

      const blog = await blogsService.createBlog(title, author, url);
      dispatch({ type: 'BLOG_ADD', data: blog });
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`, false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const modifyBlog = (modifiedBlog) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      blogsService.setToken(user.token);

      const blog = await blogsService.modifyBlog(modifiedBlog);
      dispatch({ type: 'BLOG_MODIFY', data: blog });
      dispatch(setNotification(`${blog.title} modified`, false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const deleteBlog = (blogId) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      blogsService.setToken(user.token);

      await blogsService.deleteBlog(blogId);
      dispatch({ type: 'BLOG_DELETE', data: { id: blogId } });
      dispatch(setNotification('Blog deleted', false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export const createBlogComment = (blogId, content) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      blogsService.setToken(user.token);

      const blog = await blogsService.createBlogComment(blogId, content);
      dispatch({ type: 'BLOG_MODIFY', data:  blog });
      dispatch(setNotification('Comment added', false));
    } catch (e) {
      e.response && dispatch(setNotification(e.response.data.error, true));
    }
  };
};

export default reducer;
