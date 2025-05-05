
const express=require(`express`);

const router= express.Router();

const usersController=require('../controller/users-controller');
const verifyToken=require('../middleware/verfiyToken')


router.route(`/`)
  
  .get(verifyToken,usersController.getAllUsers)


  router.route(`/register`)
  
  .post(usersController.register)

  router.route(`/login`)
  
  .post(usersController.login)

module.exports= router;