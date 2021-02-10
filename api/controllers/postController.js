const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");

const app = express();
const upload = multer();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());

let postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      if (posts) res.status(200).json(posts);
      else res.status(404).json({ message: "there are no posts " });
    } catch (error) {
      console.error(error);
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        res.status(200).json(post);
      }
      res.status(404).json({ message: "this post id doesn't exist" });
    } catch (error) {
      res.status(500);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Post.deleteOne({ _id: req.params.id });
      if (post) {
        res.status(204).send();
      }
      res.status(404).res.json({ message: "this post id doesn't exist" });
    } catch (err) {
      res.status(500);
    }
  },

  getPostByUserId: async (req, res) => {
    try {
      const user = await User.findOne( {_id: req.params.id} );
      if (user) {
        const posts = await Post.find({ user: req.params.id });
        res.status(200).json(posts);
      }
      res.status(400).res.json({ message: "this user doesn't exist" });
    } catch (error) {
      res.status(500);
    }
  },
};

module.exports = postController;
