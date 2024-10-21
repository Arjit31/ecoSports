const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controller/authController');


router.get('/', function(req, res){
    return res.json('auth page')
})

router.post('/register', registerUser);

router.post('/login', loginUser);

router.use(function(err, req, res, next){
    res.status(500).send(err.stack);
})

module.exports = router;