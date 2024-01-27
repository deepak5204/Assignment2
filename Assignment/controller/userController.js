const jwt = require("jsonwebtoken");
const Register = require("../Model/UserModel");
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const catchAsync = require("../utils/catchAsync");

//activate user
exports.activateUser = catchAsync( async (req, res) => {
    const {isActive} = req.body

    const user = User.findByIdAndUpdate(
        req.params.id, 
        {isActive},
        {new: true, runvalidator: true}
    )

    res.status(200).json({
      status: 'success',
      user
    })
})

//activate user
exports.deActivateUser = catchAsync( async (req, res) => {
  const {isActive} = req.body

  const user = User.findByIdAndUpdate(
      req.params.id, 
      {isActive},
      {new: true, runvalidator: true}
  )

  res.status(200).json({
    status: 'success',
    user
  })
})


exports.updateUser = catchAsync( async(req, res) => {
  const id = req.user._id;
  console.log(req.body);
  const user = await User.findByIdAndUpdate(id, req.body, {new: true, runvalidator: true});

  res.status(200).json({
    status: 'success', 
    user
  })
})
