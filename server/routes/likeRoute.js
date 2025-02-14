const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const likeController = require("../controllers/likeController");

const Router = express("Router");

Router.use(authController.protect);

Router.route("/:postId")
  .post(likeController.giveLike)
  .get(likeController.getAllLikeOfPost);

module.exports = Router;
