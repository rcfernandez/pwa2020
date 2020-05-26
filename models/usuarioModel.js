const mongoose = require("../bin/mongodb");
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


// Declare the Schema of the Mongo model
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

	contraseña: {
		type: String,
		required: [true, "El campo Contraseña es requerido"],
	},
});

usuarioSchema.pre('save',function(next){
    console.log(this.contraseña)
    this.contraseña = bcrypt.hashSync(this.contraseña,10);
    next();
})

module.exports = mongoose.model("usuarios", usuarioSchema); // USUARIOS responde al nombre de la coleccion en mongodb
