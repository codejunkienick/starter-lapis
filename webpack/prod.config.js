require('babel-polyfill');
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
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
    'react-css-modules',
    {
      context,
      webpackHotModuleReloading: false,
      generateScopedName: '[hash:base64]'
    }
  ],
  ...babelLoaderQuery.plugins
];

export default {
  context,
  devtool: 'source-map',
  entry: { main: ['./app/client.js'] },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader:
          'url-loader?limit=10000&mimetype=image/svg+xml!image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: JSON.stringify(babelLoaderQuery)
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, './postcss.config.js')
                }
              }
            }
          ]
          // publicPath: "/assets" // Overrides output.publicPath
        })
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.json', '.js', '.jsx'],
    alias: {
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    }
  },
  plugins: [
    new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/hard-source/prod/[confighash]'),
      recordsPath: path.resolve(__dirname, '../node_modules/.cache/hard-source/prod/[confighash]/records.json'),
      configHash: require('node-object-hash')({ sort: false }).hash
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: { context }
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.ProvidePlugin({ React: 'react' }),
    // optimizations
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      parallel: {
        cache: true,
        workers: 2
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
    new ResourceHintWebpackPlugin(),
    webpackIsomorphicToolsPlugin
  ]
};
