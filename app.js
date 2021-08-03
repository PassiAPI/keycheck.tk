var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var KeyAPI = require("./bin/privateKey")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/', async function (req, res) {


    var privateKey = req.body.privateKey
    var WIF = ""
    var adress = ""


    if (KeyAPI.checkKeyBinary(privateKey)) {
        privateKey = parseInt(number, 2).toString(16).toUpperCase();
    }
    if (KeyAPI.checkWIF(privateKey)) {
        WIF = privateKey
        privateKey = KeyAPI.fromWIF(privateKey)
    }
    if (KeyAPI.checkKeyHex(privateKey)) {
        adress = KeyAPI.toAdress(privateKey)
        balance = await KeyAPI.getBalance(adress)

        res.render("result", {
            privateKey: privateKey,
            adress: adress,
            WIF: WIF,
            WIFtype: "Your adress is compressed",
            balance: balance
        });
    } else {
        res.render("result", {privateKey: "This is not a private Key"});
    }


    console.log("Input from " + req.ip)


})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var foo = function () {
    // do something
};


module.exports = app;
