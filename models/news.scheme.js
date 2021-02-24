var mongoose = require('mongoose');

var New = new mongoose.Schema({
	folio : { type : String, trim : true },
	title : { type : String, trim : true },
	category : {
		id : { type : Number },
		name : { type : String, trim : true }
	},
	description : { type : String, trim : true },
	body : { type : String, trim : true },
	creation_date : { type : Date, default : Date.now },
	by : {
		id : { type : mongoose.Schema.Types.ObjectId, trim : true },
		fullname : { type : String, trim : true }
	},
	imageHeader : { type : String, trim : true }
});

module.exports = mongoose.model('News', New);
