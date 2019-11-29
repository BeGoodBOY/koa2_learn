const miSend = require('./mi-send');
const path = require('path');
const nunjucks = require('koa-nunjucks-2');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');
const ip = require('ip');
const miLog = require('./mi-log');
const miHttpError = require('./mi-http-error');


module.exports = (app) => {
    app.use(miHttpError({
        errorPageFolder: path.resolve(__dirname, '../errorPage')
    }));
    app.use(miLog({
        env: app.env,
        projectName: 'koa2_learn',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }));
    app.use(miSend());

    app.use(staticFiles(path.resolve(__dirname, '../public')));

    app.use(nunjucks({
        ext: 'html',
        path: path.join(__dirname, '../views'),//目录
        nunjucksConfig: {
            trimBlocks: true //开启转义 防Xss
        }
    }));

    app.use(bodyParser());

    app.on('error', function(err, ctx) {
        if(ctx && !ctx.headerSend && ctx.status < 500) {
            ctx.status = 500;
        }
        if(ctx && ctx.log && ctx.log.error) {
            if(!ctx.state.logged) {
                ctx.log.error(err.stack);
            }
        }
    });
}