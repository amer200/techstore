const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name: String,
    price: Number,
    quant: Number,
    desc: String,
    imgs: [String],
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'Categ' }
})

module.exports = mongoose.model('Prods', prodSchema);