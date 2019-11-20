const homeService = require('./../service/home');

module.exports = {
    index: async(ctx, next) => {
        ctx.response.body = '<h1>Index page</h1>';
    },
    home: async(ctx, next) => {
        console.log(ctx.request.query);
        console.log(ctx.request.querystring);
        ctx.response.body = 'Home page';
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.params);
        ctx.response.body = '<h1>Home page home/:name/:age</h1>';
    },
    login: async(ctx, next) => {
        await ctx.render('home/login', {
            btnName: 'Login'
        });
    },
    register: async(ctx, next) => {
        let {name, password} = ctx.request.body;
        const data = await homeService.register(name, password);
        ctx.response.body = data;
    }
};