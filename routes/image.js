const express = require('express');
const router = express.Router();
const verifyUser = require('../util/verifyUser');

router.use('/', verifyUser);

router.get('/', function(req, res){
    res.status(200).json('image page');
});

router.use(function(err, req, res, next){
    res.status(500).send(err.stack);
})

module.exports = router;