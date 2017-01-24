require('babel-polyfill');
import Express from 'express';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import config from '../app/config';
import webpackConfig from './dev.config';

const compiler = webpack(webpackConfig);
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;
compiler.apply(new DashboardPlugin());
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

const app = new Express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
