var util = require('util')
    , Logger = require('devnull')
    , logger = new Logger({namespacing : 0})
    , html2jade;

try {
    html2jade = require('html2jade');
} catch (err) {
    logger.error("html2jade modülü yüklenirken hata oluştu");
    html2jade = require('./node_modules/html2jade/lib/html2jade')
}

ApiController = function (app) {

    // html kodunu jade e çevirir
    app.post('/api/convert/?', function(req, res, next) {
        var html = req.body.html;
        html2jade.convertHtml(html, {}, function (err, jade, next) {
            res.json({ jade: jade });
        });
    });
}

module.exports = ApiController;