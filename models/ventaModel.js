const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const ventaSchema = new mongoose.Schema({
	fecha: {
		type: String,
		default: Date.now,
	},

	usuario: {
		type: Schema.ObjectId,
		ref: "usuarios",
		require: [true, "El campo Usuario es requerido"],
	},

	productos: {
		type: Schema.ObjectId,
		ref: "productos",
		require: [true, "El campo Producto es requerido"],
	},

	total: {
		type: Number,
		require: [true, "El campo Total es requerido"],
	},
	estado: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("ventas", ventaSchema);
