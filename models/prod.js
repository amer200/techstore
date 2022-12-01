const mongoose = require('mongoose');

const prodSchema = mongoose.Schema({
    name: String,
    price: Number,
    quant: Number,
    desc: String,
    offer: {
        type: Number,
        default: 0
    },
    imgs: [String],
    cardQ: {
        type: Number,
        default: 1
    },
    categ: { type: mongoose.Schema.Types.ObjectId, ref: 'Categ' }
})

module.exports = mongoose.model('Prods', prodSchema);