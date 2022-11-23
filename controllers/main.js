const Categ = require('../models/categ');
const Prod = require('../models/prod');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.getMainPage = async (req, res) => {
    const categs = await Categ.find();
    const randProds = await Prod.aggregate([{ $sample: { size: 3 } }]).limit(5);
    const newProds = await Prod.find().sort({ _id: -1 }).limit(5);
    res.render('main/home', {
        categs: categs,
        randProds: randProds,
        newProds: newProds
    })
}
exports.getCategPage = async (req, res) => {
    const id = req.params.id;
    const categs = await Categ.find();
    const categ = await Categ.findById(id).populate('prods');
    console.log(categ);
    res.render('main/categ', {
        categs: categs,
        categ: categ
    });
}
exports.getProdPage = async (req, res) => {
    const id = req.params.id;
    const categs = await Categ.find();
    const prod = await Prod.findById(id);
    res.render('main/prod', {
        categs: categs,
        p: prod
    })
}
exports.getSignUp = async (req, res) => {
    const categs = await Categ.find();
    res.render('main/signup', {
        categs: categs
    })
}
exports.postSignUp = async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;
    const email = req.body.email;
    const city = req.body.city;
    const zip = req.body.zip;
    const country = req.body.country;
    const address = req.body.address;
    const phone = req.body.phone;

    User.findOne({ email: email })
        .then(u => {
            if (u) {
                res.send({
                    msg: 'هذا الايميل مستخدم من قبل'
                })
            } else {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    const user = new User({
                        password: hash,
                        email: email,
                        name: name,
                        surname: surname,
                        address: address,
                        city: city,
                        zip: zip,
                        country: country,
                        phone: phone,
                        code: genRandonString(24),
                        isactive: false,
                    })
                    user.save()
                        .then(u => {
                            res.status(200).send(u);
                        })
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
}
function genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result + Date.now();
}