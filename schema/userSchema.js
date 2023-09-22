const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        }, 

        password: {
            type: String,
            required: true
        },

        date: {
            type: Date,
            default: Date.now
        }
    },
    
);

module.exports = userSchema;