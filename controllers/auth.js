exports.addUserLocal = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        if (req.session.card) {
            res.locals.card = req.session.card;
        } else {
            req.session.card = [];
            req.locals.card = [];
        }
    }
    next();
}
exports.isUserAllow = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(304).redirect('/login')
    }
}
exports.isAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.rolle == 'admin') {
            next()
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}