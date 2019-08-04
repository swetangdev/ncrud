var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    if(req.session) {
        req.session.destroy(function(err){
            if(err) {
                return next(err);
            } else {
                res.status(200).send({auth: false, token: null});
            }
        });
    }
});

module.exports = router;