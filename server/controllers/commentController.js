const catchAsync = require("../utils/catchAsync");
const Comment=require("../models/commentModel");

exports.doComment=catchAsync(async(req,res)=>{
    const {text}=req.body;
    
const newComment=await Comment.create({text,user:req.user._id,post:req.params.postId});
const comment=await Comment.findById(newComment._id).populate("user");
res.status(200).json({
    success:true,
    comment
});
})
exports.getAllCommentOfPost=catchAsync(async(req,res)=>{
    const comments=await Comment.find({post:req.params.postId}).populate('user');
    res.status(200).json({
        success:true,
        length:comments.length,
        comments
    });
})