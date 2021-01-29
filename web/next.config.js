const path = require("path");
module.exports = {
    // sass配置
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    // 开发代理配置
    async rewrites() {
        return [
            {
                source: '/webDev',
                destination: '127.0.0.1:3003'
            }
        ]
    }
};

/**
 * nextjs 区分两个中形式的预渲染
 *  1. 静态生成(static Generation) 在构建时生成,并每次页面请求时重用。
 *  2. 服务端渲染(server-side Rendering) 在每次页面请求时重新生成html
 *  3. nextjs 可以为每一个页面选择一种渲染方式,可以创造一种混合渲染模式。
 *  4. 处于性能考虑nextjs推荐使用静态生成
 * */
