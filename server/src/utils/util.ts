// 随机生成一个6位数字
export const createSixNumber = (): string => {

    let str = '';

    for (let i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 10);
    }

    return str;
}