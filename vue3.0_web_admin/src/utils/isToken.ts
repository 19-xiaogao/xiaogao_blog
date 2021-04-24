//判断token是否过期 或者是否存在
export const isToken = () => {
    const token = JSON.parse(localStorage.getItem('token') as string);
    if (!token) return false
    if (new Date().getTime() - token.timeStamp > 60 * 60 * 1000) {
        return false
    } else {
        return token.token
    }
}