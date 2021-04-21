// 登录interface
export interface IFormParamsState {
  username: string;
  password: string;
}
export interface ILoginResponse {
  token: string;
  username: string;
}

export interface IResponse<T> {
  data: T;
  success: boolean;
  message: boolean;
}
