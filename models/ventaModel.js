const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const imagenSchema = new Schema({ 
	destination: "String",
	encoding: "String",
	fieldname: "String",
	filename: "String",
	mimetype: "String",
	originalname: "String",
	path: "String",
	size: "String"
});

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

	cantidad: {
		type: Number,
		default: 0,
	},

	total: {
		type: Number,
		require: [true, "El campo Total es requerido"],
		default: 0,
	},

	medio: {
		type: Number,
		default: 1,		// 1 = efectivo; 2 = mercado pago
	},
	
	estado: {
		type: Number,
		default: 0,		// 0 = no pagado; 1 = pagado
	},
	
	imagen: {
		type: imagenSchema,
	},
});

ventaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("ventas", ventaSchema);
