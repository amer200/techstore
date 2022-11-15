const mongoose = require('mongoose');

const userScheam = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    info: Array,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
})

module.exports = mongoose.model('User', userScheam)