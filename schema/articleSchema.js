//jshint esversion:6
const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    article: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    });

module.exports = articleSchema;