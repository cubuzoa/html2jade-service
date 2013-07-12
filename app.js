/**
 * Module dependencies.
 */

// Module initializations
var express = require('express')
    , http = require('http')
    , path = require('path')
    , ENV = process.env.NODE_ENV || 'development';

var app = express();

// Application setups
app.configure('all', function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.set('view options', { layout: true });
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
});

// Error handling setup
app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// Register Controllers
['Site', 'Api'].forEach(function (controller) {
    require('./controllers/' + controller + 'Controller')(app);
});

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Create server and listen application port specified above
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
