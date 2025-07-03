const multer  = require('multer')
const path = require('path')
const AppError=require(`../Utilis/AppError`)

const diskStorage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/')
  },
  filename:function(req,file,cb){

    const ext=file.mimetype .split('/')[1];
    const filename=` ${Date.now()}${file.originalname}.${ext}`
    cb(null,filename)
  }

}) 
const fileFilter =(req,file,cb)=>{
   if(file.mimetype .split(`/`)[0]=== `image`){
    return cb(null,true)
   }else{
    return cb(AppError.create(`file must be an image`,400),false)
   }
}

module.exports={
  diskStorage,
fileFilter
};