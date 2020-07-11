const mongoose = require("../bin/mongodb");
const bcrypt = require('bcrypt');

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

var usuarioSchema = new Schema({
	
	usuario: {
		type: String,
		required: [true, "El campo Usuario es requerido"],
		unique: true,
	},

	nombre: {
		type: String,
		required: [true, "El campo Nombre es requerido"],
		trim: true
	},

	apellido: {
		type: String,
		trim: true
	},

	telefono: {
		type: String,
		trim: true
	},

	email: {
		type: String,
		required: [true, "El campo Email es requerido"],
		trim: true
	},

	password: {
		type: String,
		required: [true, "El campo Email es requerido"],
	},
	rol: Number,
	imagen: imagenSchema,
});

usuarioSchema.pre('save',function(next){
    console.log(this.password)
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

usuarioSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("usuarios", usuarioSchema); // USUARIOS responde al nombre de la coleccion en mongodb
