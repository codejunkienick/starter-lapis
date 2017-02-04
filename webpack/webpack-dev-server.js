require('babel-polyfill');

import Express from 'express';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import config from '../app/config';
import webpackConfig from './dev.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';

const app = new Express();
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

console.log(path.resolve(__dirname, '../static/dist'));
const compiler = webpack(webpackConfig[0]);
const serverOptions = {
  contentBase: path.resolve(__dirname, '../static'),
  overlay: true,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig[0].output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};
const devMiddleware =  webpackDevMiddleware(compiler, serverOptions);
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

// app.get('*', function(req, res) {
//   const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${webpackConfig[0].output.path}/index.html`)
//   res.send(htmlBuffer.toString())
// });

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
