const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,          // 自动打开浏览器
    host: 'localhost',   // 指定主机
    port: 8080,          // 指定端口
    https: false         // 启用 https
  },
  chainWebpack(config) {
    config.plugin('html').tap(args => {
      args[0].title = 'nealxmw';  // 在此设置页面标题
      return args;
    });
  }
})
