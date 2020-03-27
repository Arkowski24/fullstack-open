import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = (username, password) => {
  const payload = {
    username,
    password
  };
  const request = axios.post(baseUrl, payload);
  return request.then(response => response.data);
};

export default { login };
