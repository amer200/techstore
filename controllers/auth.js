exports.addUserLocal = (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
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