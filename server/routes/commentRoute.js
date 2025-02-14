const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const Router = express("Router");

Router.use(authController.protect);

Router.route("/:postId")
  .post(commentController.doComment)
  .get(commentController.getAllCommentOfPost);

module.exports = Router;
