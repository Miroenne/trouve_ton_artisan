var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DB = require('./repositories/manage_Db.js') 
const cors = require('cors')

var indexRouter = require('./routes/index');
const top3Router = require('./routes/top3')
const categoriesRouter = require('./routes/categories')
const societiesRouter = require('./routes/societies')

var app = express();

/**
 * Initialize the database before the API starts handling incoming requests.
 */
DB.initDb();

app.use(cors({
    exposedHeaders: ["Authorization"],
    origin : (origin, callback) => {

        /*const allowedOrigin = process.env.ALLOWED_ORIGIN;*/
        const localRegex = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

        if(!origin || localRegex.test(origin) /*|| origin === allowedOrigin*/){
            return callback(null, true);
        }

        return callback(new Error('Origin non authorisée par CORS'));
    },
    credentials: true
}));

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
