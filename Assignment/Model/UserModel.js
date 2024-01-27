const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        validator: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profile: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    },
    isActive: {
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})


userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

// userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
//     if(this.passwordChangedAt){
//         const changedTimestamp = parseInt(this.passwordChangedAt.getTime() /1000 )

//         return JWTTimestamp < changedTimestamp;
//     }
// z
//     //False means Not changed
//     return false;
// }

const User = mongoose.model('User', userSchema);

module.exports = User;