const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    subject: String,
    msg: String
})
module.exports = mongoose.model('Msg', msgSchema);