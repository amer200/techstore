const Categ = require('../models/categ');
const Prod = require('../models/prod');
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