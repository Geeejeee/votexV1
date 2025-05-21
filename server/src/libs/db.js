const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async (callback) => {
   try{
       let client = await mongoose.connect(process.env.MONGO_URL);

       if(client){
           console.log("Database connected");
           return callback(client);
       }
       return callback();
   }
   catch(error){
       console.log(error);
       process.exit(1);
   }
}

module.exports = connectDB;


