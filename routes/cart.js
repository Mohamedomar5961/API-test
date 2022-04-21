const express = require("express");

const router = express.Router();
const Cart = require("../models/Cart");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Cart.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a new post
router.post("/", async (req, res) => {
  const post = new Cart({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    gender: req.body.gender,
    price: req.body.price,
    color: req.body.color,
    description: req.body.description,
    id: req.body.id,
    status: req.body.status,
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
    const post = await Cart.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a post
router.delete("/:postId", async (req, res) => {
  try {
    const removePost = await Cart.deleteOne({ _id: req.params.postId });
    req.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a post
router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Cart.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          gender: req.body.gender,
          price: req.body.price,
          color: req.body.color,
          description: req.body.description,
          id: req.body.id,
          status: req.body.status,
        },
      }
    );
    req.json(updatePost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
