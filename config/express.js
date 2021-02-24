//Libs
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var fs = require('fs')

module.exports = function(app) {
    //var port = app.config.port || 3000;
    //app.set('showStackError', true);
    //app.use(express["static"]("" + app.config.root + "/public/client"));
    //app.set('port', port);
    //app.use(expressValidator());
    app.use('/assets', express.static('assets'))
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
};
