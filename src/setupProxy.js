const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/member", {
      target: "http://api.drop-the-beatbox.store",
      changeOrigin: true,
    })
  );
};
