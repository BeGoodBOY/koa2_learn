const path = require('path');
const nunjucks = require('nunjucks');

module.exports = (opts = {}) => {
    const env = opts.env || process.env.NODE_ENV || 'development';

    let fileName = 'other';
    const folder = opts.errorPageFolder;
    const templateFile = path.resolve(__dirname, './error.html');

    return async (ctx, next) => {
        try {
            await next();
            // ctx.response.status默认为404 
            //响应正常最终返回404&&响应body为空说明代码逻辑处理有问题所以丢出404异常
            if(ctx.response.status === 404 &&  !ctx.response.body) {
                ctx.throw(404);
            }
        } catch(e) {
            // 请求异常处理放在第一个中间件，保证最先处理异常（koa洋葱模型）
            let status = parseInt(e.status);
            const message = e.message;

            if(status>=400) {
                switch(status) {
                    case 400:
                    case 404:
                    case 500: 
                        fileName = status;
                        break;
                    default: 
                        fileName = 'other';
                }
            }else {
                status = 500;
                fileName = 'other';
            }

            //错误文件路径
            const filePath = folder ? path.join(folder, `${fileName}.html`) : templateFile;
            
            try {
                nunjucks.configure( folder ? folder : __dirname );
                const data = await nunjucks.render(filePath, {
                    env: env,
                    status: e.status || e.message,
                    error: e.message,
                    stack: e.stack
                });
                ctx.status = status;
                ctx.body = data;
            } catch(e) {
                ctx.throw(500, `错误页渲染失败：${e.message}`);
            }
        }
    } 
}