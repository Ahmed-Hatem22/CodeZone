const mongoose= require(`mongoose`);
const validator=require(`validator`);
const userRole=require("../Utilis/userRole");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,`Please provide a valid email address`]
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    token:{
        type: String
    },
    role:{
        type:String,
        enum:[userRole.USER,userRole.ADMIN,userRole.MANGER],
        default:userRole.USER,
    }

})

module.exports=mongoose.model(`User`,userSchema);