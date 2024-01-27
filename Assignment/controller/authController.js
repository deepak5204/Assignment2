
const util = require('util');
const promisify = util.promisify;
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError')

const User = require('../Model/UserModel');
const catchAsync = require('../utils/catchAsync');


const signToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}


exports.signup = catchAsync( async(req, res, next) => {
    const { name, email, password, profile, passwordChangedAt } = req.body;
    const newUser = await User.create({
        name,
        email,
        password,
        profile,
        passwordChangedAt
    });

    const token = signToken(newUser._id) 
    res.status(201).json({
        status: 'success',
        newUser
    })
});


exports.login = async (req, res, next) => {
    const {email, password} = req.body

    //1. check if email and password exist
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }


    //2. check if user exists && password is correct
    const user = await User.findOne({email: email}).select('+password');

    if(!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Incorrect email or password', 401));
    }


    //3. if everything is ok, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      stauts: 'success',
      token  
    })

}




exports.protect = catchAsync( async (req, res, next) => {

    //1. getting token and check of it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return next(new AppError('You are not logged in! Please login...', 401));
    }
    
    //2. verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)


    //3. Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist',401))
    }

    // //4. Check if user changed the password after the token was issued
    // if(currentUser.changedPasswordAfter(decoded.iat)){
    //     return next(new AppError('User recently changed password! Please log in again'))
    // }

    //grant access protected route
    req.user = currentUser;
    next();
})




exports.restrictTo = (...profile) => {
    return (req, res, next) => {
        if(!profile.includes(req.user.profile)){
            return next(new AppError('You do not have permission to do this action'))
        }
        next();
    }
}