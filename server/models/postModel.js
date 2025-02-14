const mongoose = require("mongoose");
 
const postSchema=new mongoose.Schema({
    text:{
        type:String
    },
    image:{
        type:String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
       },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    like:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }   

})

module.exports=mongoose.model("Post",postSchema);