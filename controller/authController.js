const User = require('../models/user');
const errorHandler = require('../util/error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;

async function registerUser(req, res, next){
    try{
        const {name, username, email, password, type} = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const newPassword = await bcrypt.hash(password, salt);
        // console.log(req.body);
        // console.log(name, username, email, password, newPassword);
        const newUser = new User({
            name, username, email, password: newPassword, type
        })
        const user = await newUser.save();
        console.log(user)
        res.status(200).json(user);
    } catch(err){
        next(err);
    }
}

async function loginUser(req, res, next){
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        console.log(user);
        if(user){
            const validate = await bcrypt.compare(password, user.password);
            console.log(validate);
            if(validate){
                const token = jwt.sign({id: user._id, type: user.type}, process.env.JWT_SECRET);
                res.cookie("EcoSportsToken", token);
                res.status(200).json("Logged in!");
            }
            else{
                next(errorHandler(400, "Wrong password!"));
            }
        }
        else{
            next(errorHandler(400, "Wrong username!"));
        }
    }catch(err){
        next(err);
    }
}

module.exports = {registerUser, loginUser};