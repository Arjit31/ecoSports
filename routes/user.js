const express = require('express');
const verifyUser = require('../util/verifyUser');
const router = express.Router();
const {getUser, updateUser, deleteUser, getUserBatch} = require('../controller/userController');

router.use('/', verifyUser);

router.get('/', function(req, res){
    return res.json('profile page')
})

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/batches/:id', getUserBatch);

router.use(function(err, req, res, next){
    res.status(500).send(err.stack);
})

module.exports = router;