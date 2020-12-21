import { Response } from "../types";
// 后端向前端响应的数据
export const writeResult = (params: Response) => JSON.stringify({ ...params });