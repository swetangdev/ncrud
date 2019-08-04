var sessionChecker = (req, res, next) => {
    
    if (req.session.username) {
        res.redirect('/home');
    } else {
        next();
    }    
};

module.exports = sessionChecker;