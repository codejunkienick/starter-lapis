import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HappyPack from 'happypack';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';

const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, '../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

const context = path.resolve(__dirname, '../');
const assetsPath = path.resolve(__dirname, '../static/dist');
const host = process.env.HOST || 'localhost';
const port = +process.env.PORT + 1 || 3001;
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

const main = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?path=http://' +
  host +
  ':' +
  port +
  '/__webpack_hmr',
];

const entryPoint = server =>
  server
    ? { entry: { main: [ ...main, './app/app.js' ] } }
    : { entry: { main: [ ...main, './app/client.js' ] } };



const config = server => ({
  devtool: 'cheap-module-inline-source-map',
  context: context,
  cache: true,
  performance: { hints: false },

  ...entryPoint(server),

  output: {
    path: server
    ? path.resolve(__dirname, '../static/dist/server')
    : assetsPath,
    publicPath: 'http://' + host + ':' + port + '/dist/',
    filename: 'app.js',
    chunkFilename: '[id].[hash].js',
    libraryTarget: (server ? 'commonjs2' : 'var'),
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  externals: (server ? nodeModules : {}),

  ...(server ? {target: 'node'} : {}),

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              exportAsEs6Default: true
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'ctmJSX'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'ctmCSS'
            }
          }
        ]
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/file-loader'
            }
          }
        ]
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/svg+xml'
            }
          }
        ]
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
    new webpack.NamedModulesPlugin(),
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/hard-source/dev/[confighash]'),
      recordsPath: path.resolve(__dirname, '../node_modules/.cache/hard-source/dev/[confighash]/records.json'),
      configHash: require('node-object-hash')({ sort: false }).hash
    }),
    new HappyPack({
      id: 'ctmJSX',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          query: babelLoaderQuery
        }
      ]
    }),
    new HappyPack({
      id: 'ctmCSS',
      threadPool: happyThreadPool,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[local]___[hash:base64:5]',
        {
          loader: 'postcss-loader',
          query: {
            config: {
              path: path.resolve(__dirname, './postcss.config.js')
            }
          }
        }
      ]
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: context,
      }
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context,
      manifest: require(path.resolve(assetsPath, 'vendor-manifest.json'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })

  ]
});

export default [ config(false) ];

