import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password: {
        type:String,
        minLength: [8,"password must have at least 8 charcters"],
        maxLength: [32,"password must have at most 32 charcters"],
        select:false,
    },
    phone:String,  //( because we can take its lenght easliy when it is in stirg)

    accountVerified: 
    {
        type:Boolean,
        default:false 
    }, 

    verificationCode:Number,

    verificationCodeExipre:Date,

    resetpasswordToken:String,
    resetpasswordExpire:Date,

    createdAt: 
    {
        type:Date,
        default:Date.now
    }
});


// for hashing the password

userSchema.pre("save", async function (next) {
    if(! this.isModified("password"))
    {
        next();
    }


    this.password = await bcrypt.hash(this.password,10)    // 10 these value show how to much your password is strong
})



// for comparing the password when we login to the hashed password

userSchema.methods.comparepassword= async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}


userSchema.methods.generateVerificationCode = function()
{
    function generateRandomFiveDigitNumber()
    {
        const firstDigit = Math.floor(Math.random()*9)+1;
        const remainingDigits = Math.floor(Math.random()*10000).toString().padStart(4,"0");

        return parseInt(firstDigit + remainingDigits);
    }

    const verificationCode = generateRandomFiveDigitNumber();
    this.verificationCode=verificationCode;
    this.verificationCodeExipre = Date.now()+5*60*1000

    return verificationCode;     
}


userSchema.methods.generateToken = async function () {
    return jwt.sign({id : this._id} , process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}


userSchema.methods.generateResetPasswordToken = function()
{
    const resetToken= crypto.randomBytes(20).toString("hex");

    this.resetpasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetpasswordExpire = Date.now() +15*60*1000;

    return resetToken  ;
}


export const User = mongoose.model("User", userSchema) 