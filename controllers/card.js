const Prod = require('../models/prod');
exports.addTocard = (req, res, next) => {
    const prodId = req.params.id;
    let oldProd;
    req.session.card.forEach(c => {
        if (c._id.toString() == prodId) {
            oldProd = 1;
        }
    })
    if (oldProd) {
        req.session.card.forEach(c => {
            if (c._id.toString() == prodId) {
                c.cardQ++
            }
            next()
        })
    } else {
        Prod.findById(prodId)
            .then(p => {
                req.session.card.push(p);
                next()
            })
            .catch(err => {
                console.log(err)
            })
    }
}
exports.minProdFromCard = (req, res, next) => {
    const prodId = req.params.id;
    req.session.card.forEach(c => {
        if (c._id.toString() == prodId) {
            c.cardQ--;
            next();
        }
    })
}
exports.plusProdFromCard = (req, res, next) => {
    const prodId = req.params.id;
    req.session.card.forEach(c => {
        if (c._id.toString() == prodId) {
            c.cardQ++;
            next();
        }
    })
}