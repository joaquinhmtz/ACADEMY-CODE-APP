var NewsCtrl = require('./news.controller');

module.exports = function (app, router) {
	router.route('/news/list').get(NewsCtrl.list)
}
