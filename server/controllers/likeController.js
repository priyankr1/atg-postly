const catchAsync = require("../utils/catchAsync");
const Like = require("../models/likeModel");
exports.giveLike = catchAsync(async (req, res) => {
  let like = await Like.create({
    user: req.user._id,
    post: req.params.postId,
  });
  like=await Like.findById(like._id).populate("user");
  res.status(200).json({
    success: true,
    message: `You gived a like to ${like?.user?.name} post`,
    like
  });
});
exports.getAllLikeOfPost = catchAsync(async (req, res) => {
  const allLike = await Like.find({ post: req.params.postId }).populate("user");
  res.status(200).json({
    success: true,
    likeLen: allLike.length,
    allLike,
  });
});
