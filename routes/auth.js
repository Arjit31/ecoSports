const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    return res.json('auth page')
})

module.exports = router;