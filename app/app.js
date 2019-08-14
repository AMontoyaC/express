const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// CONSTANTS
const PUBLIC_FILES_PATH = express.static(`${__dirname}/public`);
const UPLOADS_FILES_PATH = express.static(`${__dirname}/uploads`);
const ninetyDaysInMilliseconds = 7776000000;
const app = express();

// express config
app.set('case sensitive routing', false); // set false to make /foo and /Foo the same
app.set('strict routing', false); // set false to make /foo and /foo/ the same
app.set('json spaces', 2); // # of spaces to indent prettified json
app.set('x-powered-by', false); // remove x-powered-by header
app.set('trust proxy', true);

// view engine config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// public static assets
app.use('/', PUBLIC_FILES_PATH); // set path for public files
app.use('/uploads', UPLOADS_FILES_PATH); // set path for public files

// allow CORS on any env except production
if (process.env.NODE_ENV !== 'production') {
  app.use(cors())
}

// express logs with morgan library
app.use(logger('dev'));

// express parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// express public static files
app.use(express.static(path.join(__dirname, 'public')));

// initial route
app.get('/', (req, res) => {
  const viewData = {
    title: 'Express Framework', 
    message: 'Welcome to this website!'
  }
  res.render('index', viewData);
})


// Express Routes
const routes = [
  'users',
]

// add routes
routes.forEach(routeName => {
  app.use('/', require(`./routes/${routeName}.js`))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Database connection
mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`Database connected to ${process.env.DATABASE_URL}`)
  })
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Listening for requests on http://localhost:${process.env.PORT}`);
    app.emit('app.started');
  }))
  .catch((error) => {
    console.log('Error at server startup')
    console.error(error)
  });

module.exports = app;
