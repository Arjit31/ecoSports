const User = require('../models/user');
const errorHandler = require('../util/error');
const bcrypt = require('bcrypt');
const saltRounds = 12;

async function getUser(req, res, next){
    if(req.user.id == req.params.id){
        try
        {
            const user = await User.findOne({_id: req.user.id});
            res.status(200).json(user);
        }
        catch(err) {
            next(err);
        }
    }
    else{
        next(errorHandler(401, "Thats not your account!!"));
    }
}

async function updateUser(req, res, next){
    if(req.user.id == req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(saltRounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try
        {
            const updatedUser = await User.findByIdAndUpdate(
                req.user.id,
                {
                    $set: req.body
                },
                {new: true}
                //This is an option that tells Mongoose to return the updated document after the update is applied, rather than the original document
            );
            res.status(200).json(updatedUser);
        }
        catch(err) {
            next(err);
        }
    }
    else{
        next(errorHandler(401, "Thats not your account!!"));
    }
}

async function deleteUser(req, res, next){
    if(req.user.id == req.params.id){
        try
        {
            const user = await User.findByIdAndDelete(req.user.id);
            res.status(200).json(user);
        }
        catch(err) {
            next(err);
        }
    }
    else{
        next(errorHandler(401, "Thats not your account!!"));
    }
}

module.exports = {getUser, updateUser, deleteUser};