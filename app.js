//jshint esversion:6
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
mongoose.connect("mongodb://127.0.0.1:27017/newArticleDB", {useNewUrlParser: true})

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const user = require("./route/user");


app.use("/api/user", user);




app.listen(3000, ()=>{console.log("listening on port: 3000")});