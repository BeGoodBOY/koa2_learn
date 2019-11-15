const Koa = require('koa');
const router = require("koa-router")();

app = new Koa();

// 路由
router.get('/', async (ctx, next) => {
    ctx.response.body = 'Index Page';
});

router.get('/home', async (ctx, next) => {
    ctx.response.body = 'Home page';
});

router.get('/error', async (ctx, next) => {
    ctx.response.body = 'Error page';
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});