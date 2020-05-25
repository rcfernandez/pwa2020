const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const productoSchema = new Schema({
	name: {
		type: String,
		require: [true, "El campo Name es requerido"],
		unique: true,
	},
	price: Number,
	quantity: {
		type: Number,
		default: 0,
	},
	category: {
		type: Schema.ObjectId, // ID
		ref: "categorias", // hace referencia a la coleccion
	},
	relevant: {
		type: Number,
		default: 0,
	},
});

module.exports = mongoose.model("productos", productoSchema);
