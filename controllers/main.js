const Categ = require('../models/categ');
const Prod = require('../models/prod');
const User = require('../models/user');
const Order = require('../models/order');
const Msg = require('../models/msg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
exports.getMainPage = async (req, res) => {
    const categs = await Categ.find();
    const randProds = await Prod.aggregate([{ $sample: { size: 3 } }]).limit(5);
    const newProds = await Prod.find().sort({ _id: -1 }).limit(4);
    const offer = await Prod.find().sort({ "offer": -1 }).limit(4);
    const orders = await Order.find();
    res.render('main/home', {
        categs: categs,
        randProd: randProds,
        newProds: newProds,
        offer: offer,
        orders: orders.length
    })
}
exports.getCategPage = async (req, res) => {
    const id = req.params.id;
    const categs = await Categ.find();
    const categ = await Categ.findById(id).populate('prods');
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
                            res.redirect('/')
                        })
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getLogin = async (req, res) => {
    const categs = await Categ.find();
    res.render('main/login', {
        categs: categs,
        msg: false
    })
}
exports.postLogin = async (req, res) => {
    const categs = await Categ.find();
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
        .then(u => {
            if (!u) {
                res.render('main/login', {
                    categs: categs,
                    msg: 'البريد الاكتروني خطاء'
                })
            } else {
                if (bcrypt.compareSync(password, u.password)) {
                    req.session.user = u;
                    req.session.card = [];
                    res.redirect('/')
                } else {
                    res.render('main/login', {
                        categs: categs,
                        msg: 'كلمة المرور خطاء'
                    })
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
}
exports.card = (req, res) => {
    res.status(200).send({
        msg: 'ok'
    })
}

exports.getInfo = async (req, res) => {
    const categs = await Categ.find();
    res.render('main/info', {
        categs: categs
    })
}
exports.getCond = async (req, res) => {
    const categs = await Categ.find();
    res.render('main/cond', {
        categs: categs
    })
}
exports.getCntactUs = async (req, res) => {
    const categs = await Categ.find();
    res.render('main/contact', {
        categs: categs
    })
}
exports.postContactUS = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const subject = req.body.subject;
    const msg = req.body.msg;

    const mssg = new Msg({
        name: name,
        email: email,
        phone: phone,
        msg: msg,
        subject: subject
    })
    mssg.save()
        .then(m => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getShopBag = async (req, res) => {
    const categs = await Categ.find();
    let prods = req.session.card;
    let total = 0;
    let totalAll = 0;
    prods.forEach(p => {
        if (p.offer > 0) {
            let offer = (p.price * p.offer) / 100;
            let priceAfterOffer = p.price - offer;
            total = total + (priceAfterOffer * p.cardQ);
        } else {
            total = total + (p.price * p.cardQ);
        }
    })
    totalAll = ((20 * total) / 100) + total;
    res.render('main/shop-bag', {
        categs: categs,
        prods: prods,
        total: total,
        totalAll: totalAll
    })
}
/***********************************************************************/
function genRandonString(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result + Date.now();
}
exports.Search = async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await Prod.find({ name: { $regex: new RegExp(payload + '.*', 'i') } }).limit(10);
    search = search.slice(0, 10);
    console.log(search)
    res.send({
        payload: search
    })
}