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

const productoSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El campo Descripción es requerido"],
  },
  descripcion: {
    type: String,
    require: [true, "El campo Descripción es requerido"],
  },
  precio: {
    type: Number,
    default: 0,
  },
  cantidad: {
    type: Number,
    default: 0,
  },
  categoria: {
    type: Schema.ObjectId, // ID
    ref: "categorias", // hace referencia a la coleccion
  },
  destacado: {
    type: Number,
    default: 0,
  },
  imagen: imagenSchema

});

productoSchema.set('toJSON',{getters:true,virtuals:true})
productoSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("productos", productoSchema);
