
const express=require(`express`);
const {body}= require(`express-validator`);
const userRole=require("../Utilis/userRole");
const router= express.Router();
const verifyToken=require("../middleware/verfiyToken");
const controllers=require(`../controller/controller-cor`);
const allowedTo=require(`../middleware/allowedTo`);



router.route(`/`)
  
  .get(controllers.getAllCourses)
  .post(
    [
      body(`title`)
        .notEmpty()
        .withMessage("title is not found")
        .isLength({ min: 2 })
        .withMessage("title is at least two "),
      body(`price`).notEmpty().withMessage("price is required"),
    ],
    controllers.addCourses
  );


router.route(`/:id`) 
    .get(controllers.getCourse)
    .patch(controllers.updateCourses)
    .delete(controllers.deleteCourses)



module.exports = router;