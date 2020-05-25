const mongoose = require('../bin/mongodb')
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    name:String,
})

module.exports = mongoose.model('categorias', categoriaSchema)
