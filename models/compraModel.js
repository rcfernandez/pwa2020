const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const compraSchema = new mongoose.Schema({
	date: {
		type: String,
		default: Date.now,
	},

	user: {
		type: Schema.ObjectId,
		ref: "usuarios",
		require: [true, "El campo Usuario es requerido"],
	},

	products: {
		type: Schema.ObjectId,
		ref: "productos",
		require: [true, "El campo Producto es requerido"],
	},

	total: {
		type: Number,
		require: [true, "El campo Total es requerido"],
	},
	state: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("compra", compraSchema);
