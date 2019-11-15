const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    if(ctx.request.path === '/' ) {
        ctx.response.body = 'Index page';
    }else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if(ctx.request.path === '/home') {
        ctx.response.body = 'Home page';
    }else {
        await next();
    }
});

app.use(async (ctx, next) => {
    if(ctx.request.path === '/error') {
        ctx.response.body = 'error page';
    }else {
        await next();
    }
});

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});