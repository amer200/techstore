const mongoose = require('mongoose');

const categSchema = mongoose.Schema({
    name: String,
    img: String,
    prods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prods' }]
})
module.exports = mongoose.model('Categ', categSchema);