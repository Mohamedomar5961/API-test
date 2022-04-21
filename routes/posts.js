const express = require("express");

const router = express.Router();
const Post = require("../models/Post");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a new post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    gender: req.body.gender,
    price: req.body.price,
    color: req.body.color,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.send(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get a single post
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Post.deleteOne({ _id: req.params.postId });
    req.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          gender: req.body.gender,
          price: req.body.price,
          color: req.body.color,
          description: req.body.description,
        },
      }
    );
    req.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
