const mongoose=require('mongoose');
require('dotenv').config();
const dburl=process.env.DATABASE_URL;
const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(dburl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.error(err);
    }
}
module.exports=connectDB;