import 'babel-polyfill';
import http from 'http';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import SocketIo from 'socket.io';
import { logger, middleware as requestMiddleware } from './helpers/logger';
import handleUserSocket from './ws';
import config from './config';
import multer from 'multer';

const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);

app.use(cookieParser(config.secret));
app.use(session({
  secret: config.secret,
  key: 'usersid',
  cookie: { maxAge: 1200000 },
  resave: false,
  saveUninitialized: false
}));
//app.use(httpLogger('dev'));
app.use(requestMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(config.projectDir + '/public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);        
  }
});
const upload = multer({ storage });
const fields = [
  { name: 'files', maxCount: 8  },
  { name: 'file', maxCount: 1 },
];
app.post('/public/file/upload', upload.fields(fields), function (req, res, next) {
  if (req.files['file'] && req.files['file'][0]) {
    console.log('single upload');
    res.json({
      "_id":{"$id":"5805d994eba058b874802cab"},
      "png": '/uploads/' + req.files['file'][0].filename,
      "size":202687,
      "name":"\u0421\u043d\u0438\u043c\u043e\u043a \u044d\u043a\u0440\u0430\u043d\u0430 \u043e\u0442 2016-09-19 19-32-08.png",
      "compileId":false,
      "originalFormat": "png",
      "sizes":{
        "50x50": 'uploads/' + req.files['file'][0].filename,
        "100x100": 'uploads/' + req.files['file'][0].filename,
        "150x213": 'uploads/' + req.files['file'][0].filename,
        "300x300": 'uploads/' + req.files['file'][0].filename,
        "500x500": 'uploads/' + req.files['file'][0].filename
      },
      "original":false
    });
  }
  if (req.files['files']) {
    console.log(req.files['files']);
    res.json([{
      "_id":{"$id":"5805d994eba058b874802cab"},
      "png": '/uploads/' + req.files['files'][0].filename,
      "size":202687,
      "name":"\u0421\u043d\u0438\u043c\u043e\u043a \u044d\u043a\u0440\u0430\u043d\u0430 \u043e\u0442 2016-09-19 19-32-08.png",
      "compileId":false,
      "originalFormat": "png",
      "sizes":{
        "50x50": '/uploads/' + req.files['files'][0].filename,
        "100x100": '/uploads/' + req.files['files'][0].filename,
        "150x213": '/uploads/' + req.files['files'][0].filename,
        "300x300": '/uploads/' + req.files['files'][0].filename,
        "500x500": '/uploads/' + req.files['files'][0].filename
      },
      "original":false
    }]);
  }
})



// Setup routes
//Object.keys(routes).forEach((route) => app.use('/' + route + '/', routes[route]));

// Log errors
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err);
    next(err);
  }
});


if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      logger.error(err);
    }
    console.log('----\n==> SIMPLE DEBUG API is running on port %s', config.apiPort);
    console.log('==>  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

  io.listen(runnable);

  io.on('connection', (socket) => {
    handleUserSocket(socket);
  });
} else {
  console.error('==> ERROR: No PORT environment variable has been specified');
}
