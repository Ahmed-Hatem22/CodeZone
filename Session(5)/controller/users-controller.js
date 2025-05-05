const asyncWrapper = require("../Utilis/asyncWrapper");
const generateJWT = require("../Utilis/generateJWT");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
 
  //get all courses from DB using Course model
  try{
   
  const usersAll = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip)
     res.json({ status: "success", data: { usersAll } });
     
  }
    catch(error){
      console.log(`ehna`);
      console.log(error);
      }
  ;
});

const register = asyncWrapper(async (req, res) => {
  const { firstName, lastName, email, password,role } = req.body;

  const olduser = await User.findOne({ email });
  if (olduser)
    return res
      .status(400)
      .json({ status: "error", message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role
  });
  // generate jwt token
  const token=await generateJWT({email: newUser.email, id:newUser._id,role:newUser.role})
  //console.log("token", token);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({ status: "success", data: { user: newUser } });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  //console.log(password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ status: "error", message: "User not found" });
  }
  //console.log(user);
  const matchedPassword = await bcrypt.compare(password, user.password);
  //console.log(`password`,matchedPassword);
  if (user && matchedPassword) {

    const token=await generateJWT({email: user.email, id:user._id,role:user.role})
//console.log (token);

    return res
      .status(200)
      .json({ status: "sucess",data:{token}});
  } else {
    return res.status(401).json({ status: "error", message: "Invalid email" });
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
