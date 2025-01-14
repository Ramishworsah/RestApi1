const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
    cid:{
        type:Number,
        unique:true,
        required:true
    },

    cname:{
        type:String,
        required:[true,'left side is nor empty']
       
    },
    description:{
        type:String,
        required:true
        },
        cbranch:{
            type:String,
            required:true
        },
        cstdate:{
            type:Date,
            required:true
        },
        cPrice:{
            type:String,
            required:true
        },
        registered:{
            type:Date,
            default:Date.now
        }
    })

module.exports=mongoose.model("course",courseSchema);
