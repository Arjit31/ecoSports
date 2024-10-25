const express = require('express');
const verifyUser = require('../util/verifyUser');
const {postBatch, getBatch, updateBatch, deleteBatch, registerUserBatch, unregisterUserBatch} = require('../controller/batchController');
const router = express.Router();

router.use('/', verifyUser);

router.get('/', function(req, res){
    return res.json('batch page');
});

router.post('/', postBatch);
router.get('/:id', getBatch);
router.post('/:id', updateBatch);
router.delete('/:id', deleteBatch);
router.post('/user/:id', registerUserBatch);
router.delete('/user/:id', unregisterUserBatch);

router.use(function(err, req, res, next){
    res.status(500).send(err.stack);
});

module.exports = router;