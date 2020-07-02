const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const ventaSchema = new mongoose.Schema({
	fecha: {
		type: String,
		require: [true, "El campo Fecha es requerido"],
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

ventaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("ventas", ventaSchema);
