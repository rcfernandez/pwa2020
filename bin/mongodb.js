var mongoose = require("mongoose");

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

module.exports = mongoose;
