const express=require('express');
const userRouter=require('./routes/userRoutes');
const postRouter=require('./routes/postRoutes');
const db=require("./config/db");
const errorController = require('./controllers/errorController');
const path=require('path');
const cors = require("cors");
const commentRouter=require("./routes/commentRoute");
const likeRouter=require("./routes/likeRoute");



require("dotenv").config();


const app=express();

// db connection
db();


  
  // Enable CORS with the specified options
  app.use(cors());

app.set("view engine",'pug');// here we set our template engine which we used to client side rendering 
app.set('views',path.join(__dirname,'views'));

app.use(express.json({limit:'10kb'}));// middleware for using req.body
app.use(express.static(`${__dirname}/public`));



app.use("/api/v1/user",userRouter);
app.use("/api/v1/post",postRouter);
app.use("/api/v1/comment",commentRouter);
app.use("/api/v1/like",likeRouter);



// error handle

app.use((err, req, res, next) => {
    errorController(err, req, res, next);
    });

app.listen(process.env.PORT,()=>{
console.log(`App is listening at ${process.env.PORT}`);
})
