require('babel-polyfill');

// Webpack config for creating the production bundle.
var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var strip = require('strip-loader');
var postcss = require('./postcss-config.js');

var projectRootPath = path.resolve(__dirname, '../');
var assetsPath = path.resolve(projectRootPath, './static/dist');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './app/client.js',
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [
          'html-loader',
          'typograf-loader?lang=ru'
        ]
      },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel-loader']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1!postcss-loader'}) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1!postcss-loader!sass-loader'}) },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml!image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    extensions: ['*', '.json', '.js', '.jsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
    }
  },
  plugins: [
    new HardSourceWebpackPlugin({
      // Either an absolute path or relative to output.path.
      cacheDirectory: path.resolve(__dirname, 'hard-source-cache/prod/[confighash]'),
      recordsPath: path.resolve(__dirname, 'hard-source-cache/prod/[confighash]/records.json'),
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
        files: ['package.json'],
      },
      // `environmentHash` can also be a function. that can return a function
      // resolving to a hashed value of the dependency environment.
      environmentHash: function() {
        // Return a string or a promise resolving to a string of a hash of the 
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
      minimize: true,
      debug: false,
      options: {
        context  : __dirname,
        postcss: postcss(),
      },
    }),
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({filename: '[name]-[chunkhash].css', allChunks: true, ignoreOrder: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.ProvidePlugin({
      'React':     'react',
    }),

    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
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

    webpackIsomorphicToolsPlugin
  ]
};
