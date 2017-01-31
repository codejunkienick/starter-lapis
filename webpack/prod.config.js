require('babel-polyfill');
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import postcss from './postcss-config.js';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsConfig from './webpack-isomorphic-tools';
import CleanPlugin from 'clean-webpack-plugin';
import ResourceHintWebpackPlugin from 'resource-hints-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import strip from 'strip-loader';

const projectRootPath = path.resolve(__dirname, '../');
const context = path.resolve(__dirname, '../');
const assetsPath = path.resolve(projectRootPath, './static/dist');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  WebpackIsomorphicToolsConfig
);
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
        context,
        webpackHotModuleReloading: false,
				"generateScopedName": "[hash:base64]"
			}
		],
  ...babelLoaderQuery.plugins
];

export default {
  context,
  devtool: 'cheap-module-source-map',
  entry: { main: ['./app/client.js'] },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      { test: /\.html$/, loaders: ['html-loader'] },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug'), 'babel-loader?' + JSON.stringify(babelLoaderQuery)]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1!postcss-loader'
        })
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
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml!image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      }
    ]
  },
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['*', '.json', '.js', '.jsx']
  },
  plugins: [
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to output.path.
      cacheDirectory: path.resolve(
        __dirname,
        'hard-source-cache/prod/[confighash]'
      ),
      recordsPath: path.resolve(
        __dirname,
        'hard-source-cache/prod/[confighash]/records.json'
      ),
      configHash: function(webpackConfig) {
        // Build a string value used by HardSource to determine which cache to
        // use if [confighash] is in cacheDirectory or if the cache should be
        // replaced if [confighash] does not appear in cacheDirectory.
        //
        // node-object-hash on npm can be used to build this.
        return require('node-object-hash')().hash(webpackConfig);
      },
      // Optional field. This field determines when to throw away the whole
      // cache if for example npm modules were updated.
      environmentHash: {
        root: process.cwd(),
        directories: ['node_modules'],
        files: ['package.json']
      },
      // `environmentHash` can also be a function. that can return a function
      // resolving to a hashed value of the dependency environment.
      environmentHash: function() {
        // Return a string or a promise resolving to a string of a hash of the
        return new Promise(function(resolve, reject) {
          require(
            'fs'
          ).readFile(__dirname + '/../yarn.lock', function(err, src) {
            if (err) {
              return reject(err);
            }
            resolve(
              require('crypto').createHash('md5').update(src).digest('hex')
            );
          });
        });
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: { context, postcss: postcss() }
    }),
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
      ignoreOrder: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.ProvidePlugin({ React: 'react' }),
    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new HtmlWebpackPlugin({
      inject: 'head',
      favicon: path.resolve(__dirname, '..', 'static', 'favicon.ico'),
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'static', 'template.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true
      }
    }),
    new ResourceHintWebpackPlugin(),
    webpackIsomorphicToolsPlugin
  ]
};
