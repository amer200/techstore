const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name: String,
    price: Number,
    quant: Number,
    desc: String,
    offer: Number,
    imgs: [String],
    cardQ: Number,
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'Categ' }
})

module.exports = mongoose.model('Prods', prodSchema);