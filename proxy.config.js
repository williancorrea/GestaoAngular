const proxy = [
    {
        context: '/api',
        target: 'https://gestao-api-wcorrea.herokuapp.com',
        pathRewrite: {'^/api': ''}
    }
];
module.exports = proxy;
