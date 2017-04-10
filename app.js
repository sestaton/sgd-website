var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var requireDir   = require('require-dir');
var vhost        = require('vhost');
var compression  = require('compression');

var app = express();

//use compression
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(compression({filter: shouldCompress}));

// stress subdomain
var stressRouter = require('./routes/stress/stressRouter');
app.use(vhost('stress.sunflowergenome.org', stressRouter));
app.use(vhost('www.stress.sunflowergenome.org', stressRouter));

// blast app is a Rails app running on a different port
var blastRouter = require('./routes/blast/blastRouter');
app.use(vhost('sunflowergenome.org/blast/', blastRouter));
app.use(vhost('www.sunflowergenome.org/blast/', blastRouter));

// mount all routes http://stackoverflow.com/a/25446206
var routes = requireDir('./routes', {recurse: false}); // https://www.npmjs.org/package/require-dir
for (var i in routes) app.use('/', routes[i]);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.enable('view cache');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // short
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist')));
//use compression
//app.use(compression({filter: shouldCompress}))

//function shouldCompress (req, res) {
//  if (req.headers['x-no-compression']) {
//    // don't compress responses with this request header
//    return false
//  }
//
//  // fallback to standard filter function
//  return compression.filter(req, res)
//}
//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log("Node ENV: ", req.app.get('env'));
  req.app.get('env') === 'development' ? res.render('error') : res.render('404');
});

module.exports = app;
