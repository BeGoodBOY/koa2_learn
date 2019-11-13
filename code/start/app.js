const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = 'Hello world';
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});