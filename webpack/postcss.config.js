var path = require('path');

module.exports = ({ file, options, env }) => ({
  parser: file.extname === '.sss' ? 'sugarss' : false,
  plugins: {
    'postcss-import': {
      path: [path.resolve(__dirname, '../app/css')]
    },
    'postcss-cssnext': {},
    'postcss-nested': {},
    'postcss-inline-svg': {},
    'postcss-browser-reporter': {},
    'postcss-reporter': {}
  }
});
