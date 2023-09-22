//jshint esversion:6
const express = require("express");
const jwt = require("jsonwebtoken");

const checkLogin = async function ( req, res, next) {
    const { authorization } = req.headers;
    try {
        const token = await authorization.split(" ")[0];
        const decoded = jwt.verify(token, process.env.SIGNATURE_KEY);
        const {username , userId } = decoded;
        req.userId = userId;
        req.username = username;        
        next()
        
    } catch (error) {
        res.status(401).json({
            "message": "Authentication faild! Please login!"
        })
    }
};

module.exports = checkLogin;