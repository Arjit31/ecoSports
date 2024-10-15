const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;
const User = require('../models/user');


router.get('/', function(req, res){
    return res.json('auth page')
})

router.post('/register', async function(req, res){
    try{
        const {name, username, email, password} = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const newPassword = await bcrypt.hash(password, salt);
        // console.log(req.body);
        // console.log(name, username, email, password, newPassword);
        const newUser = new User({
            name, username, email, password: newPassword
        })
        const user = await newUser.save();
        console.log(user)
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
})

router.post('/login', async function(req, res){
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        console.log(user);
        if(user){
            const validate = await bcrypt.compare(password, user.password);
            console.log(validate);
            if(validate){
                const token = jwt.sign({username: username, password: password}, process.env.JWT_SECRET);
                res.cookie("EcoSportsToken", token);
                res.status(200).json("Logged in!");
            }
            else{
                res.status(400).json("Wrong password!");
            }
        }
        else{
            res.status(400).json("Wrong username!");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;