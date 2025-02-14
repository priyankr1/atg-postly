const mongoose = require('mongoose');


const db = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('db connected successfully');
    } catch (err) {
      console.log(err);
      console.log('problem in connecting database');
    }
  };

  module.exports=db;