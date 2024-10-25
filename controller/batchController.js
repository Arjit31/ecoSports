const Batch = require('../models/batch');
const User = require('../models/user');
const errorHandler = require('../util/error');

async function postBatch(req, res, next){
    try {
        const user = await User.findOne({_id: req.user.id});
        console.log(user);
        if(user.type == 'athlete') next(errorHandler(401, "User not coach!"));
        const {name, timing} = req.body;
        const newBatch = new Batch({
            name, coachId: req.user.id, timing, users: []
        })
        const batch = await newBatch.save();
        user.batches.push(batch._id);
        user.save();
        res.status(200).json({batch: batch, user: user});
    } catch (error) {
        next(error);
    }
}

async function getBatch(req, res, next){
    try {
        if(req.user.type == 'athlete') next(errorHandler(401, "User not coach!"));
        const batch = await Batch.findOne({_id: req.params.id});
        if(batch.coachId != req.user.id) next(errorHandler(401, "That's not your batch!"));
        res.status(200).json(batch);
    } catch (error) {
        next(error);
    }
}

async function updateBatch(req, res, next){
    try {
        if(req.user.type == 'athlete') next(errorHandler(401, "User not coach!"));
        const batch = await Batch.findOne({_id: req.params.id});
        if(batch.coachId != req.user.id) next(errorHandler(401, "That's not your batch!"));
        const updateBatch = await Batch.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        );
        res.status(200).json(updateBatch);
    } catch (error) {
        next(error);
    }
}

async function deleteBatch(req, res, next){
    try {
        if(req.user.type == 'athlete') next(errorHandler(401, "User not coach!"));
        const batch = await Batch.findOne({_id: req.params.id});
        if(batch.coachId != req.user.id) next(errorHandler(401, "That's not your batch!"));
        const user = await User.findOne({_id: req.user.id});
        user.batches.splice(user.batches.indexOf(req.params.id), 1);
        user.save();
        const deletedBatch = await Batch.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedBatch);
    } catch (error) {
        next(error);
    }
}

async function registerUserBatch(req, res, next){
    try {
        if(req.user.type == 'coach') next(errorHandler(401, "User not athlete!"));
        const batch = await Batch.findOne({_id: req.params.id});
        const user = await User.findOne({_id: req.user.id});
        if(user.batches.includes(req.params.id)) next(errorHandler(401, "Batch already exist!"));
        user.batches.push(req.params.id);
        batch.users.push(req.user.id);
        user.save();
        batch.save();
        res.status(200).json({user: user, batch: batch});
    } catch (error) {
        next(error);
    }
}

async function unregisterUserBatch(req, res, next){
    try {
        if(req.user.type == 'coach') next(errorHandler(401, "User not athlete!"));
        const batch = await Batch.findOne({_id: req.params.id});
        const user = await User.findOne({_id: req.user.id});
        if(user.batches.includes(req.params.id) == false) next(errorHandler(401, "No such batch exist!"));
        user.batches.splice(user.batches.indexOf(req.params.id), 1);
        batch.users.splice(batch.users.indexOf(req.user.id), 1);
        user.save();
        batch.save();
        res.status(200).json({user: user, batch: batch});
    } catch (error) {
        next(error);
    }
}

module.exports = {postBatch, getBatch, updateBatch, deleteBatch, registerUserBatch, unregisterUserBatch};