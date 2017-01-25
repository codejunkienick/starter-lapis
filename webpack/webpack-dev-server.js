require('babel-polyfill');
import Express from 'express';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import config from '../app/config';
import webpackConfig from './dev.config';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

const app = new Express();
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

webpackConfig.forEach(function(config) {
  const compiler = webpack(config);
  const serverOptions = {
    contentBase: 'http://' + host + ':' + port,
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: webpackConfig[0].output.publicPath,
    headers: {'Access-Control-Allow-Origin': '*'},
    stats: {colors: true}
  };

    app.use(devMiddleware(compiler, serverOptions));
    app.use(hotMiddleware(compiler, {
        log: console.log, path: config.output.publicPath + '__webpack_hmr', heartbeat: 10 * 1000
    }));
})



app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port);
  }
});
