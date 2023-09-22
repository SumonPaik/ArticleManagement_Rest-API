const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// this is defining "User" model
const Article = new mongoose.model("Article", require("../schema/articleSchema"));


//Starting Route is : /api/article/

//-------->> Route to get all articles -->>
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find({}).populate("user", "username");
        if (articles) {
            res.status(200).json(articles);
        } else {
            res.status(200).json("No article is found for you! You can create a new");
        }
    } catch (error) {
        res.status(200).json({
            "message": error.message
        })
    }
});

//-------->> Route to get a article -->>
router.get("/:id", async (req, res) => {
    try {
        const articles = await Article.find({ _id: req.params.id }).populate("user", "username");
        if (articles.length < 0) {
            res.status(200).json(articles);
        } else {
            res.status(200).json("No article is found for you! You can create a new");
        }
    } catch (error) {
        res.status(200).json({
            "message": error.message
        })
    }
});

//-------->> Route to post a new article -->>
router.post("/", async (req, res) => {
    try {
        const article = new Article({
            ...req.body,
            user: req.userId
        });
        await article.save();

        res.status(200).json("A new article has been added.")

    } catch (error) {
        res.status(200).json({
            "message": error.message
        })
    }
});

//-------->> Route to Update a article by Only Creator -->>
router.patch("/:id", async (req, res) => {
    try {
        await Article.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            {
                $set: {
                    ...req.body
                }
            },
            { new: true }
        ).then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(200).json("You are not authorized to update this article!");
            }
        });
    } catch (error) {
        res.status(200).json({
            "message": error.message
        })
    }
});

//-------->> Route to Update a article by Only Creator -->>
router.delete("/:id", async (req, res) => {
    try {
        await Article.findOneAndDelete(
            { _id: req.params.id, user: req.userId }
        ).then((result) => {
            if (result) {
                res.status(200).json({
                    "Deleted": result
                });
            } else {
                res.status(200).json("You are not authorized to Delete this article!");
            }
        });
    } catch (error) {
        res.status(200).json({
            "message": error.message
        })
    }
});

module.exports = router;