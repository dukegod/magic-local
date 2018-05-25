/**
 * 服务器搭建
 */
const koa = require('koa');
const koaStatic = require('koa-static');

const app = new koa();

module.exports = function (params) {
  console.log('params', params);

  app.use(koaStatic(params));
  app.listen(9999);
  console.log(params);
  console.log('在端口9999启动了');
}


