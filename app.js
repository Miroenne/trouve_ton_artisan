var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const DB = require('./repositories/manage_Db.js') 
const { sequelize } = require('./models');
const cors = require('cors')

var indexRouter = require('./routes/index');
const top3Router = require('./routes/top3')
const categoriesRouter = require('./routes/categories')
const societiesRouter = require('./routes/societies')
const allowedOrigins = [
    process.env.FRONT_ORIGIN,
    process.env.ADMIN_ORIGIN,
].filter(Boolean);

var app = express();

/**
 * Initialize the database before the API starts handling incoming requests.
 */
DB.initDb()
    .then(() => sequelize.authenticate())
    .catch((error) => {
        console.error('Erreur lors de l initialisation de la base de données', error);
    });

app.use(cors({
    /*
     * Only the public frontend and future admin frontend declared in the
     * environment are allowed to call the API from a browser.
     */
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Origin non authorisée par CORS'));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
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
