const express = require("express");
const authController = require("../controllers/authController");
const postController = require("../controllers/postController");
const {
  uploadUserPhoto,
  uploadPhotoToFirebase,
  resizePostPhoto,
  uploadPostPhoto,
} = require("../middlewares/file");

const Router = express("Router");

Router.use(authController.protect);

Router.route("/").get(postController.getAllPost);

Router.route("/:userId")
  .post(uploadPostPhoto,resizePostPhoto, uploadPhotoToFirebase, postController.doPost)
  .get(postController.getUserPost);

Router.route("/:id")
  .delete(postController.deleteUserPost)
  .patch(uploadPostPhoto,resizePostPhoto, uploadPhotoToFirebase,postController.updatePost);
module.exports = Router;
