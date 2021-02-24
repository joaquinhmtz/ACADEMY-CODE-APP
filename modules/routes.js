var NewsRoute = require('./news/news.route');

module.exports = function (app, router) {	
	NewsRoute(app, router);
}
