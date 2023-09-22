const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewear/checkLogin");

// this defining "User" model
const User = new mongoose.model("User", require("../schema/userSchema")); 


//------->> Route for signUp a user /api/user" ------
router.post("/", async function(req,res){
    const hashedpassword = await bcript.hash(req.body.password, 10);
    try {
       await User.findOne({username: req.body.username}).then((result)=>{
        if (!result) {            
            const newUser = new User({
                username: req.body.username,
                password: hashedpassword
            });
            newUser.save();
            res.status(200).json({
                "message": "A new user has been added successfully!"
            })
        } else {
            res.status(200).json({
                "message": "User is already exist! try logIn!"
            })
        }
       })
    } catch (error) {
        console.log(error.message);
    }
});

//------->> Route to Login a user "/api/user/login" ------
router.post("/login", async function(req,res){
    const user = await User.findOne({username: req.body.username});

    bcript.compare(req.body.password, user.password, (err, hashedpassword)=>{
        if (!err) {
            const token = jwt.sign({
                userId: user._id,
                username: user.username
            }, process.env.SIGNATURE_KEY, {
                expiresIn: "1h"
            });
            res.status(200).json({
                "token" : token,
                "message": "Loged In Successfully!"
            });
        } else {
            res.status(200).json({
                "message": err.message
            });
        }
    });
});

//------->> Route to self user profile "/api/user/:id" ------
router.get("/:id", checkLogin, async function(req,res){
    try {
        await User.find({_id: req.params.id}, "username date").then((result)=>{
            res.send(result);
        });
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;