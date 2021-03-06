const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const newsScheme = require('./../../models/news.scheme');
var fs = require('fs');
var myCss = {
   style : fs.readFileSync('./assets/css/style.css','utf8'),
	 icons : fs.readFileSync('./assets/font-awesome/css/font-awesome.min.css','utf8')
};



function list(req, res, next) {
	console.log('api list');
	return res.status(200).send({ success: true });
}

function getNewById(req, res, next) {
	let _id = req.params._id;
	console.log('api get by id', req.params);
	newsScheme
		.findOne({ _id : ObjectId(_id) })
		.exec(function (err, response) {
			if (err) return next(err);

			return res.render('article', { success: true, data: response, myCss: myCss });
		});
}

function getArticlesRelated(req, res, next) {
  var data = req.params;

  newsScheme
    .find({ 'category.id' : data.id })
    .sort({ 'creation_date' : -1 });
    .limit(5)
    .then((results) => {
      if(err) next(err);

      return res.status(200).send({ success: true, data: results });
    });
}

module.exports = {
	list: list,
	getNewById: getNewById,
  getArticlesRelated: getArticlesRelated
};
