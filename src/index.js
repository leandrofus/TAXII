const express = require("express");
const { MongoClient } = require("mongodb");
const morgan = require("morgan");
const session = require('express-session');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser')



var app;
app = express();
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//middleware
app.use(session({
    secret: 'micaela',
    name: 'user',
    saveUninitialized: false
}))
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')),
    app.set('view engine', 'hbs'),
    app.engine('hbs', hbs.engine({
        defaultLayout: 'index',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: [path.join(app.get('views'), 'partials')],
        extname: '.hbs'
    }));

//routes

const routes = require('./router/home')

//router
app.use('/', routes);



app.listen(process.env.PORT || 5000, () => {
    console.log('server 3000')
});

module.exports = app