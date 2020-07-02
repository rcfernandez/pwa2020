var mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate-v2');

mongoose.connect(
	"mongodb://localhost/pwa2020",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	function (err) {
		if (err) {
			throw err;
		} else {
			console.log("Conectado a MongoDB");
		}
	}
);

mongoosePaginate.paginate.options = {
	lean: true,
	// limit: 1
}

mongoose.mongoosePaginate = mongoosePaginate;
module.exports = mongoose;
