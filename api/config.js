require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  apiHost: process.env.APIHOST || '127.0.0.1',
  apiPort: process.env.APIPORT || 3010,
  projectDir: __dirname + '/../',
  secret: 'asdasdafasasf',
  server: {
    databaseURL: 'mongodb://localhost/starter-lapis'
  },
  vk: {
    clientId: '',
    secret: ''
  },
  facebook: {
    secret: '',
    key: ''
  },
  instagram: {
    key: '',
    secret: ''
  },
  twitter: {
    key: '',
    secret: ''
  }

}, environment);
