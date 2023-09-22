const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    //Cast joining date as a user
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = userSchema;