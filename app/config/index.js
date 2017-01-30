require('babel-polyfill');

const environment = ({
  development: { isProduction: false },
  production: { isProduction: true },
})[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT,
    dadataToken: '',
    app: {
      title: 'starter-lapis',
      description: '',
      head: {
        titleTemplate: 'starter-lapis - %s',
        meta: [
          { name: 'description', content: '' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'starter-lapis' },
          { property: 'og:locale', content: 'ru_RU' },
          { property: 'og:title', content: 'starter-lapis' },
          { property: 'og:description', content: '' },
          { property: 'og:card', content: 'summary' },
          { property: 'og:image:width', content: '500' },
          { property: 'og:image:height', content: '500' },
        ],
      },
    },
  },
  environment,
);
