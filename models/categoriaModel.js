const mongoose = require('../bin/mongodb');
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

const subcategoriaSchema = new Schema({

	descripcion: {
		type: String,
		required: [true, "El campo Usuario es requerido"],
	},
});

const categoriaSchema = new Schema({
	descripcion: {
		type: String,
		require: [true, 'El campo Descripción es requerido'],
	},

	imagen: imagenSchema,

	subcategorias: [subcategoriaSchema],
});

categoriaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model('categorias', categoriaSchema);
