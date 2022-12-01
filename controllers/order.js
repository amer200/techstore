const Order = require('../models/order');
exports.submitOrder = (req, res) => {
    const prods = req.session.card;
    const user = req.session.user._id;
    let total = 0;
    prods.forEach(p => {
        if (p.offer > 0) {
            let offer = (p.price * p.offer) / 100;
            let priceAfterOffer = p.price - offer;
            return total = total + (priceAfterOffer * p.cardQ);
        } else {
            return total = total + (p.price * p.cardQ);
        }
    });
    console.log(total)
    const newOrder = new Order({
        prods: prods,
        user: user,
        total: total,
        status: 'new'
    })
    newOrder.save()
        .then(o => {
            req.session.card = [];
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}