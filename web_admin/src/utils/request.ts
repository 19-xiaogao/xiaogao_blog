import axios from "axios";

const server = axios.create({
  baseURL: '/devApi',
  timeout: 5000,
});

server.interceptors.request.use(
  (confirm) => {
    console.log(confirm.url)
    return confirm;
  },
  (err) => Promise.reject(err)
);

server.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => Promise.reject(err)
);

export default server;
