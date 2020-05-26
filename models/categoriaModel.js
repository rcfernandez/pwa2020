const mongoose = require('../bin/mongodb')
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    descripcion:String,
})

module.exports = mongoose.model('categorias', categoriaSchema)
