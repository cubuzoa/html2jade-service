var util = require('util')
    , Logger = require('devnull')
    , logger = new Logger({namespacing : 0});

SiteController = function (app) {

    app.get('/?', function(req, res, next) {
        res.render('index', {
            title: "Html to Jade converter developed by ExpressJS, and AngularJS"
        });
    });

    app.get('/404/?', function(req, res, next) {
        next();
    });
}

module.exports = SiteController;