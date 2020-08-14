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

const usuarioSchema = new Schema({
	usuario: { type: String, required: true },
	nombre: { type: String },
	apellido: { type: String },
	email: { type: String, required: true },
	telefono: { type: String },
	imagen: imagenSchema
});

const productoSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true	},
	precio: { type: Number },
	categoria: { type: String },
	imagen: imagenSchema
});

const ventaSchema = new mongoose.Schema({
	fecha: { type: String, require: [true, "El campo Fecha es requerido" ] },
	usuario: usuarioSchema,
	producto:  productoSchema,
	cantidad: { type: Number, default: 1 },
	total: { type: Number, require: [true, "El campo Total es requerido"], default: 0 },
	medio: { type: Number, default: 1 },	// 1 = efectivo; 2 = mercado pago
	estado: { type: Number,	default: 0 }	// 0 = no pagado; 1 = pagado	
});

ventaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("ventas", ventaSchema);
