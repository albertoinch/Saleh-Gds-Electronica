const http = require('http');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const stackTrace = require('stack-trace');
const load = require('./src/lib/load');

global._path = __dirname;

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

var app = express();

app.diferencia = 0;
app.fecha = function() {
  return new Date(new Date().getTime() + app.diferencia);
}

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'pug');

app.config = require('./src/config/config')();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(app.config.api.pub, express.static(path.join(__dirname, 'public')));
app.use(multer().single('file'));

app.db = require('./src/lib/db')(app);
require('./src/lib/middleware')(app);

app.pub = express.Router();
app.use(app.config.api.pub, app.pub);

app.pub = express.Router();
app.use(app.config.api.pub, app.pub);
app.api = express.Router();
app.use(app.config.api.main, app.api);

load(app, 'src/dao');
load(app, 'src/controllers');
load(app, 'src/routes', false);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.code = err.code ? err.code : 3001;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name == 'JsonSchemaValidation') {
    if (err.validations.body && err.validations.body.length) {
      res.locals.message = err.validations.body[0].property + ' ' + err.validations.body[0].messages;
    }
    if (err.validations.params && err.validations.params.length) {
      res.locals.message = err.validations.params[0].property + ' ' + err.validations.params[0].messages;
    }
  }

  const trace = stackTrace.parse(err);
  if (trace.length) {
    console.log('---', new Date(), trace[0].fileName, `${trace[0].lineNumber},${trace[0].columnNumber}`, err.message);
  } else {
    console.log('---', new Date(), err);
  }

  // render the error page
  res.setHeader('Content-Type', 'application/json');
  res.status(err.status || 500);
  res.render('error');
});

app.cola = require('./src/lib/cola')(app);
app.cola.start();

if (process.env.NODE_ENV != 'test') {
    app.set('port', app.config.puerto);
} else {
    app.set('port', app.config.puerto + 1);
}

require('./src/lib/cron')(app);

const server = http.createServer(app);

server.listen(app.get("port"));

module.exports = app;
