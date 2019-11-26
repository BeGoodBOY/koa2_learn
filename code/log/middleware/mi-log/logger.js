const log4js = require('log4js');
const access = require('./access');
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

//默认公用参数
const baseInfo = {
    appLogLevel: 'debug',//日志级别
    dir: 'logs', //日志存放目录
    env: 'dev', //运行环境
    projectName: 'koa2_learn',
    serverIp: '0.0.0.0',//服务器IP
};

module.exports = (options) => {

const realInfo = Object.assign({}, baseInfo, options || {});

const {env, appLogLevel, dir, serverIp, projectName} = realInfo;
//公用日志信息
const commonInfo = {projectName, serverIp};
    const contextLogger = {};
    const appenders = {};

    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    };

    if(env === 'dev' || env === 'local' || env === 'development') {
        appenders.out = {
            //控制台打印日志
            type: 'console'
        };
    }

    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    };

    const logger = log4js.getLogger('cheese');

    return async (ctx, next) => {
        const start = Date.now();
        log4js.configure(config);
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo));
            }
        });

        ctx.log = contextLogger;

        await next();
        const responseTime = Date.now() - start;
        logger.info(access(ctx, {responseTime: `响应时间为${responseTime}ms`}, commonInfo));
    }
}

// module.exports = (options) => {
//     return async (ctx, next) => {
//         const start = Date.now();
//         log4js.configure({
//             appenders: {
//                 cheese: {
//                     type: 'file',
//                     filename: 'cheese.log'
//                 }
//             },
//             categories: {
//                 default: {
//                     appenders: ['cheese'],
//                     level: 'info'
//                 }
//             }
//         });
//         const logger = log4js.getLogger('cheese');
//         await next();
//         const end = Date.now();
//         const responseTime = end - start;
//         logger.info(`响应时间为${responseTime}ms`);
//     }
// }



// log4js.configure({
//     /**
//     * 指定要记录的日志分类 cheese
//     * 展示方式为文件类型 file
//     * 日志输出的文件名 cheese.log
//     */
//     appenders: {
//         cheese: { 
//             type: 'file',
//             filename: 'cheese.log'
//         },
//     },
//     /**
//     * 指定日志的默认配置项
//     * 如果 log4js.getLogger 中没有指定，默认为 cheese 日志的配置项
//     * 指定 cheese 日志的记录内容为 error 及 error 以上级别的信息
//     */
//     categories: {
//         default: {
//             appenders: ['cheese'],
//             level: 'error'
//         }
//     }
// });

// const logger = log4js.getLogger('cheese');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese');
// logger.info('cheese is Gouda');
// logger.warn('cheese is quite smelly');
// logger.error('cheese is too ripe!');
// logger.fatal('cheese was breeding ground for listeria.');