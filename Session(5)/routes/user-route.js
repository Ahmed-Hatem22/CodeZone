
const express=require(`express`);

const router= express.Router();

const multer  = require('multer')
const userphoto=require(`../Utilis/userphoto`)
const upload = multer({ 
  storage: userphoto.diskStorage,
fileFilter:userphoto.fileFilter
});

const usersController=require('../controller/users-controller');
const verifyToken=require('../middleware/verfiyToken')


router.route(`/`)
  
  .get(verifyToken,usersController.getAllUsers)


  router.route(`/register`)
  
  .post( upload.single('avatar'),usersController.register)

  router.route(`/login`)
  
  .post(usersController.login)

module.exports= router;