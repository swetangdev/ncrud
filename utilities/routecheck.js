var sessionChecker = (req, res, next) => {

    if (req.session.username) {
        res.redirect('/home');
    } else {
        res.redirect('/login');
    }
};

module.exports = sessionChecker;