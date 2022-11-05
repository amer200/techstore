const Categ = require('../models/categ');
const Prod = require('../models/prod');

exports.getMainPage = async (req, res) => {
    try {
        const categs = await Categ.find();
        const prods = await Prod.find();
        console.log(prods)
        res.render('admin/prods', {
            c: categs,
            p: prods
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