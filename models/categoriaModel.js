const mongoose = require('../bin/mongodb');
const Schema = mongoose.Schema;

const subcategoriaSchema = new Schema({
	descripcion: {
		type: String,
	},
});

const categoriaSchema = new Schema({
	descripcion: {
		type: String,
		require: [true, 'El campo Descripción es requerido'],
	},

	subcategorias: [subcategoriaSchema],
});

categoriaSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model('categorias', categoriaSchema);
