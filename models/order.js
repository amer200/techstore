const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    prods: [],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    total: Number,
    status: String //done , new , shpping
})

module.exports = mongoose.model('Order', orderSchema);