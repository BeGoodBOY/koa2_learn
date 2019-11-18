const Koa = require('koa');
const router =require('koa-router')();
const app = new Koa();

router.get('/', async(ctx, next) => {
    ctx.response.body = `<h1>Index page`;
});

router.get('/home', async(ctx, next) => {
    //http://localhost:3000/home?name=libo&age=14
    console.log(ctx.request.query);//{name: 'libo', age: '14'}
    console.log(ctx.request.querystring);//name=libo&age=14
    ctx.response.body = '<h1>Home page</h1>';
});

router.get('/other/:name/:age', async(ctx, next) => {
    //http://localhost:3000/other/libo/13
    console.log(ctx.params);//{name: 'libo', age: '13'}
    ctx.response.body = '<h1>Other page</h1>';
});

router.get('/404', async(ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>';
});


app.use(router.routes());

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
