const mongoose = require("../bin/mongodb");

const Schema = mongoose.Schema;

const productoSchema = new Schema({
  descripcion: {
    type: String,
    require: [true, "El campo Descripción es requerido"],
  },
  precio: Number,
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
});

module.exports = mongoose.model("productos", productoSchema);
