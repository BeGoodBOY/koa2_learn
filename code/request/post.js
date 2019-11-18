const Koa = require('koa');
const router =require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());//应用bodyParser中间件

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

router.get('/user', async(ctx, next) => {
    ctx.response.body = `
        <form action="/user/register" method="post">
            <input name="name" type="text" placeholder="请输入用户名">
            <br>
            <input name="password" type="password" placeholder="请输入密码">
            <button>注册</button>
        </form>
    `;
});

router.post('/user/register', async(ctx, next) => {
    console.log(ctx.request.body);//{name: '', password: ''}
    let {name, password} = ctx.request.body;
    if(name === 'libo' && password === '123456') {
        ctx.response.body = `Hello ${name}!`
    }else {
        ctx.response.body = 'Please check user infomation';
    }
});

router.get('/404', async(ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>';
});


app.use(router.routes());

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
