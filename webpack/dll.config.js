import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import postcss from './postcss-config.js';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import WebpackIsomorphicToolsConfig from './webpack-isomorphic-tools.js';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig);

const context = path.resolve(__dirname, '../');
const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;
const babelrc = fs.readFileSync('./.babelrc');

let babelLoaderQuery = {};
try {
  babelLoaderQuery = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

babelLoaderQuery.plugins = [
		[
			"react-css-modules",
			{
        context: context,
        webpackHotModuleReloading: true,
				"generateScopedName": "[path]___[local]___[hash:base64:5]"
			}
		],
  ...babelLoaderQuery.plugins, 
    "react-hot-loader/babel"
];


export default {
  context,
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  },
  entry: {
    'app_assets':  ['./app/client.js'],
    'vendor': [
      'axios',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-immutable-proptypes',
      'react-css-modules',
      'react-motion',
      'react-autosuggest',
      'redux-devtools-log-monitor',
      'react-modal',
      'redux',
      'redux-form',
      'redux-saga',
      'redux-immutable',
      'immutable',
      'querystring',
      'strip-ansi',
      'ansi-regex',
      'ansi-html',
      'html-entities',
      'babel-runtime/core-js',
      'babel-polyfill',
      'process',
      'fbjs',
      'warning',
      'react-helmet',
      'react-proxy',
      'history',
      'strict-uri-encode'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: 'http://' + host + ':' + ( port - 1 ) + '/dist/',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [
          'html-loader?exportAsEs6Default'
        ]
      },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[local]___[hash:base64:5]!postcss-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
    ]
  },
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    extensions: ['*', '.json', '.js', '.jsx'],
  },
  plugins: [
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, 'hard-source-cache/dll/[confighash]'),
      recordsPath: path.resolve(__dirname, 'hard-source-cache/dll/[confighash]/records.json'),
      configHash: function(webpackConfig) {
        return require('node-object-hash')().hash(webpackConfig);
      },
      environmentHash: {
        root: process.cwd(),
        directories: ['node_modules'],
        files: ['package.json'],
      },
      environmentHash: function() {
        return new Promise(function(resolve, reject) {
          require('fs').readFile(__dirname + '/../yarn.lock', function(err, src) {
            if (err) {return reject(err);}
            resolve(
              require('crypto').createHash('md5').update(src).digest('hex')
            );
          });
        });
      },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context  : __dirname,
        postcss: postcss(),
      },
    }),
    // hot reload
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join( assetsPath, '[name]-manifest.json' ),
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM':   'react-dom',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
};
