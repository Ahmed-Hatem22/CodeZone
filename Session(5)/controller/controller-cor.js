const course = require(`../models/course.model`);
const { validationResult } = require(`express-validator`);

const asyncWrapper = require("../Utilis/asyncWrapper");
const appError = require(`../Utilis/AppError`);

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  //get all courses from DB using Course model
  const courses = await course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: "success", data: { courses } });
});
const getCourse = asyncWrapper(async (req, res, next) => {
  const courseOne = await course.findById(req.params.id);
  if (!courseOne) {
    const error = appError.create(`Course not found`, 404, `fail`);
    return next(error);
  }
  return res.json({ status: "success", data: { courseOne } });
});

const addCourses = asyncWrapper(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, `fail`);
    return next(error);
  }

  const newCourse = new course(req.body);
  // save in DB
  await newCourse.save();

  res.status(201).json({ status: "success", data: { course: newCourse } });
});
const updateCourses = asyncWrapper(async (req, res) => {
  const courseId = req.params.id;
  const updatedCourse = await course.updateOne(
    { _id: courseId },
    { $set: { ...req.body } }
  );
  return res
    .status(200)
    .json({ status: "success", data: { course: updatedCourse } });
});

const deleteCourses = asyncWrapper(async (req, res) => {
  //console.log(req.params.id);
  await course.deleteOne({ _id: req.params.id });

  res.status(200).json({ status: "success", data:req.params.id });
});

module.exports = {
  getAllCourses,
  getCourse,
  addCourses,
  updateCourses,
  deleteCourses,
};
