const Koa = require('koa');
const app = new Koa();

//logger
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(5);
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

//x-response-time
app.use(async (ctx, next) => {
    console.log(2);
    const start = Date.now();5
    await next();
    console.log(4);
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

//response
app.use(async ctx => {
    console.log(3);
    ctx.body = 'Hello wolrd';
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});

