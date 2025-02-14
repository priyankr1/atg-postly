const express = require("express");
const authController = require("../controllers/authController");
const Router = express("Router");
const User = require("../models/userModel");
const {
  uploadUserPhoto,
  uploadPhotoToFirebase,
  resizeUserPhoto,
} = require("../middlewares/file");

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);

Router.patch("/forgot-password", authController.forgotPassword);
Router.patch("/reset-password/:token", authController.verifyOtp);

Router.patch(
  "/:id",
  authController.protect,
  uploadUserPhoto,
  resizeUserPhoto,
  uploadPhotoToFirebase,
  authController.updateMe
);

Router.delete("/delete", async (req, res) => {
  await User.deleteMany({});
  res.send("deleted");
});
module.exports = Router;
