require('babel-polyfill');

import Express from 'express';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import config from '../app/config';
import webpackConfig from './dev.config';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import path from 'path';

const app = new Express();
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

console.log(path.resolve(__dirname, '../static/dist'));

webpackConfig.forEach(function(config) {
  const compiler = webpack(config);
  const serverOptions = {
    contentBase: path.resolve(__dirname, '../static'),
    quiet: false,
    noInfo: false,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  };

    app.use(devMiddleware(compiler, serverOptions));
  app.use(hotMiddleware(compiler));

})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
