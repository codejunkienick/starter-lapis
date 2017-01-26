import Express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import PrettyError from 'pretty-error';
import http from 'http';
import config from './config';
import Html from './html';

const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const maxAge = 86400000 * 7; // a week
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
app.use((req, res, next) => {
  if (req.url.match(/^\/(css|js|img|font|woff2|svg|ttf|eot|woff)\/.+/)) {
    res.setHeader('Cache-Control', 'public, max-age=' + maxAge);
  }
  next();
});
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: targetUrl });
});

app.use('/public', (req, res) => {
  proxy.web(req, res, { target: `${targetUrl}/public` });
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, { target: targetUrl + '/ws' });
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }

  const json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  function hydrateOnClient() {
    res.sendFile( path.resolve(__dirname, 'index.html'));
  }
  hydrateOnClient();
  return;

  // if (__DISABLE_SSR__) {
  //   hydrateOnClient();
  //   return;
  // }
  //
  // match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
  //   if (redirectLocation) {
  //     res.redirect(redirectLocation.pathname + redirectLocation.search);
  //   } else if (error) {
  //     console.error('ROUTER ERROR:', pretty.render(error));
  //     res.status(500);
  //     hydrateOnClient();
  //   } else if (renderProps) {
  //     const component = (
  //       <Provider store={store} key="provider">
  //         <RouterContext {...renderProps} />
  //       </Provider>
  //     );
  //
  //     res.status(200);
  //
  //     global.navigator = { userAgent: req.headers['user-agent'] };
  //
  //     res.send('<!doctype html>\n' +
  //       ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />));
  //   } else {
  //     res.status(404).send('Not found');
  //   }
  // });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
