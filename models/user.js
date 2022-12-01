const mongoose = require('mongoose');

const userScheam = mongoose.Schema({
    password: String,
    email: String,
    name: String,
    surname: String,
    address: String,
    city: String,
    zip: String,
    country: String,
    phone: String,
    code: String,
    isactive: Boolean,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
})

module.exports = mongoose.model('User', userScheam)