// 设置代理
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/devApi", {
      target: "https://mc-sys-uat.azurewebsites.net/customer",
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": "",
      },
      onProxyRes: (proxyRes, req, res) => {},
      onProxyReq: (proxyRes, req, res) => {},
      onOpen: (res) => {},
    })
  );
};
