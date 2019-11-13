# koa2起航

## Hello world 永不缺席

### app.js
```js
const Koa = require('koa')
const app = new Koa()

//中间件
app.use(async (ctx, next) {
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = 'Hello world'
})

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})
```

### 启动
```sh
node app.js
```

创建了一个基本的服务，响应内容由中间件提供，中间件乃是koa精髓之所在，后续做详解。
