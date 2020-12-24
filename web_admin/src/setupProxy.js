// 设置代理 
const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/devApi', {
    target: 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
      "^/devApi": "",
    }
  }));
};