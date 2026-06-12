var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DB = require('./repositories/manage_Db.js') 

var indexRouter = require('./routes/index');
const top3Router = require('./routes/top3')
const categoriesRouter = require('./routes/categories')
const societiesRouter = require('./routes/societies')

var app = express();

/**
 * Initialize the database before the API starts handling incoming requests.
 */
DB.initDb();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/top3', top3Router);
app.use('/categories', categoriesRouter);
app.use('/societies', societiesRouter)

module.exports = app;
