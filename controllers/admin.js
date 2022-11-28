const Categ = require('../models/categ');
const Prod = require('../models/prod');
const Order = require('../models/order');
const User = require('../models/user');
const fs = require('fs');
exports.getMainPage = async (req, res) => {
    try {
        const categs = await Categ.find();
        const prods = await Prod.find().populate('categ');
        res.render('admin/prods', {
            c: categs,
            p: prods,
        })
    }
    catch (err) {
        console.log(err)
    }
}

/* prods*/
exports.addProd = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const qwant = req.body.qwant;
    const categId = req.body.categ;
    const desc = req.body.desc;
    const offer = req.body.offer;
    const imgs = req.files;
    const categ = await Categ.findById(categId);
    const paths = [];
    imgs.forEach(i => {
        paths.push(i.path.split('public')[1])
    });

    const prod = new Prod({
        name: name,
        price: price,
        quant: qwant,
        categ: categId,
        desc: desc,
        offer: offer,
        imgs: paths
    })
    prod.save()
        .then(p => {
            categ.prods.push(p._id)
            return categ.save();
        })
        .then(c => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.editProd = (req, res) => {
    const id = req.params.pId;
    const name = req.body.name;
    const price = req.body.price;
    const qwant = req.body.qwant;
    const categId = req.body.categ;
    const desc = req.body.desc;
    const offer = req.body.offer;
    Prod.findById(id)
        .then(p => {
            p.name = name;
            p.price = price;
            p.quant = qwant;
            p.Categ = categId;
            p.desc = desc;
            p.offer = offer;
            if (req.files) {
                req.files.forEach(i => {
                    p.imgs.push(i.path.split('public')[1]);
                })
            }
            return p.save();
        })
        .then(p => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
/* categs */
exports.getCategsPage = (req, res) => {
    Categ.find()
        .then(c => {
            res.render('admin/categs', {
                categs: c
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addCateg = (req, res) => {
    const name = req.body.name;
    const img = req.file.path.split('public')[1];
    const categ = new Categ({
        name: name,
        img: img
    })
    categ.save()
        .then(c => {
            console.log(c)
            res.redirect('/admin/categs');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.editCateg = (req, res) => {
    const cId = req.params.cId;
    const name = req.body.name;
    Categ.findById(cId)
        .then(c => {
            c.name = name;
            if (req.file) {
                fs.unlink(`public${c.img}`, () => { })
                c.img = req.file.path.split('public')[1];
            }
            return c.save();
        })
        .then(c => {
            res.redirect('/admin/categs');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeCateg = (req, res) => {
    const cId = req.params.cId;
    Categ.findByIdAndRemove(cId)
        .then(c => {
            fs.unlink(`public${c.img}`, () => { })
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.getCategProds = (req, res) => {
    const categId = req.params.categId;
    Categ.findById(categId)
        .populate('prods')
        .then(c => {
            res.render('admin/categ-prod', {
                p: c.prods
            });
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProdImg = (req, res) => {
    const pId = req.params.pId;
    const img = req.query.img;
    Prod.findById(pId)
        .then(p => {
            fs.unlink(`public${img}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            p.imgs = p.imgs.filter(i => {
                return i !== img
            })
            return p.save();
        })
        .then(p => {
            res.status(200).send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProd = (req, res) => {
    const id = req.params.id;
    Prod.findByIdAndRemove(id)
        .then(p => {
            res.status(200).send({
                msg: "ok"
            })
        })
        .catch(err => {
            console.log(err)
        })
}
/**orders */
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate(['prods', 'user']);
        console.log(orders);
        res.render('admin/orders', {
            orders: orders
        })
    } catch (err) {
        console.log(err)
    }

}