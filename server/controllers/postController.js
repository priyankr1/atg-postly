const catchAsync = require("../utils/catchAsync");
const Post = require("../models/postModel");
const AppError = require("../utils/appError");

exports.doPost = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body;
  const data={text,user:userId};
  if(req.file){
    data.image=req.file.filename
  }
try{
  let post = await Post.create(data);
  post = await Post.findById(post._id).populate("user");
  res.status(200).json({
    success: true,
    post,
  });}
  catch(err){
    console.log(err);
  }
});
exports.getAllPost = catchAsync(async (req, res) => {
  const posts = await Post.find({}).populate("user");
  res.status(200).json({
    success: true,
    length: posts.length,
    posts,
  });
});

exports.getUserPost = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ user: userId }).populate("user");
  res.status(200).json({
    success: true,
    length: posts.length,
    posts,
  });
});

exports.deleteUserPost = catchAsync(async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

exports.updatePost = catchAsync(async (req, res) => {
  const { text } = req.body;
const data={text}  ;
if(req.file){
  data.image=req.file.filename;
}
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  ).populate("user");
  res.status(200).json({
    success: true,
    post: updatedPost,
  });
});
