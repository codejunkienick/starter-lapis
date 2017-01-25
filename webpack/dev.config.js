import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import postcss from './postcss-config.js';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, '../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

const host = process.env.HOST || 'localhost';
const port = +process.env.PORT + 1 || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const babelrc = fs.readFileSync('./.babelrc');

let babelrcObject = {};
try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

let combinedPlugins = babelrcObject.plugins || [];

let babelLoaderQuery = Object.assign({}, babelrcObject, {
  plugins: combinedPlugins
});
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];

const config = server => ({
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname, '..'),
  cache: true,
  performance: { hints: false },
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' +
        host +
        ':' +
        port +
        '/__webpack_hmr',
      './app/client.js'
    ]
  },
  output: {
    path: server
      ? path.resolve(__dirname, '../static/dist/server')
      : path.resolve(__dirname, '../static/dist/client'),
    filename: '[name].js',
    chunkFilename: '[id].[hash].js',
    libraryTarget: (server ? 'commonjs2' : 'var'),
    publicPath: 'http://' + host + ':' + port + '/dist/',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  externals: (server ? nodeModules : {}),

  ...(server ? {target: 'node'} : {}),

  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [ 'html-loader?exportAsEs6Default', 'typograf-loader?lang=ru' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader?' + JSON.stringify(babelLoaderQuery) ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  resolve: {
    modules: [ 'app', 'node_modules' ],
    extensions: [ '*', '.json', '.js', '.jsx' ],
  },
  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, '../'),
    //   manifest: require(path.resolve(__dirname, '../static/dist/dll'))
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    //new webpack.IgnorePlugin(/webpack-stats\.json$/),
    //webpackIsomorphicToolsPlugin.development()
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })
  ]
});

export default [ config(true), config(false) ];

