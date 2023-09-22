const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");



const userSchema = require("../schema/userSchema");
const User = mongoose.model("User", userSchema);


//------->> Route for signUp a user "http://localhost:3000/api/user" ------
router.post("/", async function(req,res){
    bcript.hash(req.body.password, 10, (err, hashedpassword)=>{
        if (!err) {
            const newUser = {
                username: req.body.username,
                password: hashedpassword
            };
            User.create(newUser);
            res.status(200).json({
                "message": "A new user has inserted Successfully!"
            });
        } else {
            res.status(200).json({
                "message": err.message
            });
        }
    });
});

//------->> Route to Login a user "http://localhost:3000/api/user/login" ------
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

//------->> Route to self user profile "http://localhost:3000/api/user/login" ------
// router.post("/user",  async function(req,res){
//     try {
        
//     } catch (error) {
        
//     }
// });

module.exports = router;