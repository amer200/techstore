const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name: String,
    price: Number,
    quant: Number,
    imgs: [String],
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'Categs' }
})

module.exports = mongoose.model('Prods', prodSchema);