import axios from "axios";

const server = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 2000,
});

server.interceptors.request.use(
  (confirm) => {
    return confirm;
  },
  (err) => Promise.reject(err)
);

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => Promise.reject(err)
);

export default server;
