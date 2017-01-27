import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import postcss from './postcss-config.js';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import StatsPlugin from 'stats-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import WebpackIsomorphicToolsConfig from './webpack-isomorphic-tools.js';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(WebpackIsomorphicToolsConfig);

const nodeModules = {};
fs.readdirSync(path.resolve(__dirname, '../node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

const assetsPath = path.join(__dirname, 'dist');
const host = process.env.HOST || 'localhost';
const port = +process.env.PORT + 1 || 3001;
const context = path.resolve(__dirname, '../');

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
] || [];

console.log(babelLoaderQuery.plugins);


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
  devtool: 'cheap-module-eval-source-map',
  context: context,
  cache: true,
  performance: { hints: false },
  
  ...entryPoint(server),

  output: {
    path: assetsPath,
    // path: server
    // ? path.resolve(__dirname, '../static/dist/server')
    // : path.resolve(__dirname, '../static/dist'),
    publicPath: '/dist/',
    filename: 'app.js',
    // filename: '[name].js',
    // chunkFilename: '[id].[hash].js',
    libraryTarget: (server ? 'commonjs2' : 'var'),
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
  },

  externals: (server ? nodeModules : {}),

  ...(server ? {target: 'node'} : {}),

  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [ 'html-loader?exportAsEs6Default' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader?' + JSON.stringify(babelLoaderQuery) ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[local]___[hash:base64:5]!postcss-loader' },
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
    // fallback: path.resolve(__dirname, "../node_modules"),
    modules: [ 'app', 'node_modules' ],
    extensions: [ '*', '.json', '.js', '.jsx' ],
  },
  // resolveLoader: { fallback: path.resolve(__dirname, "../node_modules") },
  plugins: [
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/]
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context  : context,
        postcss: postcss(),
      },
    }),
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, '../'),
    //   manifest: require(path.resolve(__dirname, '../static/dist/dll'))
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),

    webpackIsomorphicToolsPlugin.development()
  ]
});

export default [ config(false) ];

