const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    prods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prods' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    total: Number,
    status: String //complete , orderd , shpping
})

module.exports = mongoose.model('Order', orderSchema);