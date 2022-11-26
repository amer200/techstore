exports.addUserLocal = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
        res.locals.card = req.session.card;
    }
    next();
}
exports.isUserAllow = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}