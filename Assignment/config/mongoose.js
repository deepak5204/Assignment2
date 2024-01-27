const mongoose = require( "mongoose");

const connectDB = mongoose.connect('mongodb://127.0.0.1:27017/assignment')
  .then(()=> {
    console.log('db connected successfully!');
  })
  .catch((err) => {
    console.log(err);
  })

exports.default = connectDB