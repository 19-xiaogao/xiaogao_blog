import axios, { AxiosResponse } from "axios";
import { IResponse } from '../types/response'
const server = axios.create({
  baseURL: '/devApi',
  timeout: 5000,
});

server.interceptors.request.use(
  (confirm) => {
    return confirm;
  },
  (err) => Promise.reject(err)
);

server.interceptors.response.use(
  (response): AxiosResponse<IResponse> => {
    return response.data;
  },
  (err) => Promise.reject(err)
);

export default server;
