// 登录interface
export interface IFormParamsState {
    name: string;
    password: string;
}

export interface IResponse<T> {
    data: T
    success: boolean
    message: boolean
}