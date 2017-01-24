import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import WebpackIsomorphicToolsConfig from './webpack-isomorphic-tools.js';
import postcss from './postcss-config.js';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const assetsPath = path.resolve(__dirname, '../static/dist');
const host = (process.env.HOST || 'localhost');
const port = (+process.env.PORT + 1) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig);

const babelrc = fs.readFileSync('./.babelrc');
let babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

let combinedPlugins = babelrcObject.plugins || [];

let babelLoaderQuery = Object.assign({}, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];


export default {
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname, '..'),
  cache: true,
  performance: {
    hints: false
  },
  entry: {
    'main': [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './app/client.js',
    ]
  },
  output: {
    path: assetsPath,
    filename: 'app.js',
    publicPath: 'http://' + host + ':' + port + '/dist/',
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [
          'html-loader?exportAsEs6Default',
          'typograf-loader?lang=ru'
        ]
      },
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
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
      cacheDirectory: path.resolve(__dirname, 'hard-source-cache/dev/[confighash]'),
      recordsPath: path.resolve(__dirname, 'hard-source-cache/dev/[confighash]/records.json'),
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
      options: {
        context  : __dirname,
        postcss: postcss(),
      },
    }),
    new webpack.ProvidePlugin({
      'React':     'react',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DllReferencePlugin({
      context: path.join( __dirname, '../' ),
      manifest: require(path.join(assetsPath, 'vendor-manifest.json')),
    }),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),

    //webpackIsomorphicToolsPlugin.development()
  ]
};
