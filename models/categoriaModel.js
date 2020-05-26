const mongoose = require("../bin/mongodb");
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
	descripcion: {
		type: String,
		require: [true, "El campo Descripción es requerido"],
	},
});

module.exports = mongoose.model("categorias", categoriaSchema);
