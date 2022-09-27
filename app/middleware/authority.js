const jwt = require('jsonwebtoken');
const whiteList = [
  '/api/product',
  '/api/home',
  '/api/category',
  '/api/product/:id',
  '/api/search',
  '/api/user',
  '/api/user/login',
  '/api/user/code',
];
const authority = async (ctx, next) => {
  const reg = /(\S{1,})\?{1}(\S{1,})/;
  const url = ctx.req.url.replace(reg, '$1');
  if (whiteList.includes(url)) {
    await next();
  } else {
    const token = ctx.req.headers.token;
    if (token) {
      try {
        const info = jwt.verify(token, 'zzz123');
        ctx.info = info;
        await next();
      } catch (e) {
        if (e.message === 'jwt malformed') {
          ctx.throw(401, {
            code: 0,
            message: '登录失效',
          });
        } else {
          ctx.throw(422, {
            code: 0,
            message: e.message,
          });
        }
      }

    } else {
      ctx.throw(401, {
        code: 0,
        message: '请登录后访问',
      });
    }
  }
};
module.exports = () => {
  return authority;
};
