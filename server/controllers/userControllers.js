import ErrorHandler from "../middlewares/errors.js";

import { catchAsyncError } from "../middlewares/sdd.js";

import { User } from "../models/userModel.js";
import { sendEmail } from "../utiles/sendEmail.js";

import twilio from 'twilio';

import crypto from "crypto"

import { sendToken } from "../utiles/sendToken.js";
import { get } from "mongoose";

// const client = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN)     

// const client = new twilio.Twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN, {
//   accountSid: process.env.TWILIO_SID
// });




 


export const register = catchAsyncError(async (req,res,next) =>
{
    try{
        const {name,email,phone,password,verificationMethod}= req.body;
        console.log(name, email, phone, password, verificationMethod) 
        if(!name || !email || !phone || !password || !verificationMethod)
        {
            return res.status(500).json({"error": "all fields not present"})
            // return next(new ErrorHandler("all fieds are required" , 400));
        }

        function validatePhoneNumber(phone)
        {
            const phoneRegex = /^\+91\d{10}$/
            return phoneRegex.test(phone);
        }



        if(!validatePhoneNumber(phone))
        {
            return res.status(500).json({"error": "invalid phone number user"})
            // return next(new ErrorHandler("Invalid phone number",400));
        }

        const existingUser = await User.findOne({
            $or:[
                {
                    email,
                    accountVerified:true,
                },

                {
                    phone,
                    accountVerified:true,
                }
            ],
        });


        if (existingUser)
        {
            return res.status(500).json({"error": "existing user"})
            // return next(new ErrorHandler("phone or email is already register" ,400));
        }


        const registerationAttempetsByUser = await User.find({
            $or :[
                {phone,accountVerified:false},
                {email,accountVerified:false},
            ],
        });



        if(registerationAttempetsByUser>3)
        {
            return res.status(500).json({"error": "registration attempt user"})
            // return next (new ErrorHandler("you exceed the max , so please try again after 1 hr",400));
        }

        const userData = {
            name,
            email,
            phone,
            password,
        };
        

        const user = await User.create(userData);
        const verificationCode = await user.generateVerificationCode();
        await user.save();

        sendVerificationCode(verificationMethod , verificationCode ,name, email , phone,res );






    } catch(error)
    {
        next(error);
    }
});





async function sendVerificationCode(verificationMethod , verificationCode ,name, email , phone,res )
{

    try { 

       const client = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN)     
        
    if(verificationMethod === 'email')
        {
            const message  = generateEmailTemplate(verificationCode);
            const obj = {
                email:email,
                subject:"your verification code ",
                message:message,
                phone:phone
            }
            // sendEmail(email, "your verification code " ,message);
            sendEmail(obj);
            res.status(200).json
            ({
                success:true,
                message:`Verification email successfully send to ${name}`
            });
    
        }
    
    
    
        else if (verificationMethod === "phone") {

          console.log(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

          try {
            const verificationCodeWithSpace = verificationCode
            .toString()
            .split("")
            .join(" ");
          await client.calls.create({
            twiml: `<Response><Say>Your verification code is ${verificationCodeWithSpace}. Your verification code is ${verificationCodeWithSpace}.</Say></Response>`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone,
          });
          res.status(200).json({
            success: true,
            message: `OTP sent.`,
          });
          } catch (error) {
            console.log(error);
          }
          }
    
    
    
        else
        {
            return res.status(500).json({
                success:false,
                message:"invalid verification method"
            })

        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"verification code failed to send "
        })

    }
}





function generateEmailTemplate(verificationCode) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
        <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
        <p style="font-size: 16px; color: #333;">Dear User, </p>
        <p style="font-size: 16px; color: #333;">Your verification code is:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
            ${verificationCode}
          </span>
        </div>
        <p style="font-size: 16px; color: #333;">Please use this code to verify your email address. The code will expire in 10 minutes.</p>
        <p style="font-size: 16px; color: #333;">If you did not request this, please ignore this email.</p>
        <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #999;">
          <p>Thank you,<br>Your Company Team</p>
          <p style="font-size: 12px; color: #aaa;">This is an automated message. Please do not reply to this email.</p>
        </footer>
      </div>
    `;
  }







  export const verifyOTP = catchAsyncError(async (req, res, next) => {
    const { email, otp, phone } = req.body;
  
    console.log(email, otp, phone)
    function validatePhoneNumber(phone) {
        const phoneRegex = /^\+91\d{10}$/
        return phoneRegex.test(phone);
    }
  
    if (!validatePhoneNumber(phone)) {
    //   return next(new ErrorHandler("Invalid phone number.", 400));


        return res.status(400).json({success:false,message:"invalid phone number"})

        }
  
    try {

      const userAllEntries = await User.find({
        $or: [
          {
            email: email,
            accountVerified: false,
          },
          {
            phone: phone,
            accountVerified: false,
          },
        ],
      }).sort({ createdAt: -1 }); 
  
      if (userAllEntries.length == 0) {
        // return next(new ErrorHandler("User not found.", 404));
        return res.status(404).json({success:false,message:"user not found"})

      }
  
      let user;
      console.log("user entries: ", userAllEntries)
  
      if (userAllEntries.length > 1) {
        user = userAllEntries[0];
  
        await User.deleteMany({
          _id: { $ne: user._id },
          $or: [
            { phone, accountVerified: false },
            { email, accountVerified: false },
          ],
        });
      } else {
        user = userAllEntries[0];
      }

      console.log("user is: ", user);
  
      if (user.verificationCode !== Number(otp)) {
        // return next(new ErrorHandler("Invalid OTP.", 400));




        return res.status(400).json({success:false,message:"Invalid otp found"})



      }
  
      const currentTime = Date.now();
  
      const verificationCodeExipre = new Date(
        user.verificationCodeExipre
      ).getTime();
      console.log(currentTime);
      console.log(verificationCodeExipre);
      if (currentTime > verificationCodeExipre) {
        // return next(new ErrorHandler("OTP Expired.", 400));

        return res.status(400).json({success:false,message:"otp got expired"})


      }
  
      user.accountVerified = true;
      user.verificationCode = null;
      user.verificationCodeExipre = null;
      await user.save({ validateModifiedOnly: true });
  
      sendToken(user, 200, "Account Verified.", res);
    }
    
    catch (error) {
    //   return next(new ErrorHandler("Internal Server Error.", 500));

        console.log(error);

      return res.status(500).json({success:false,message:"kuch toh backchodi ho gyi hai"})
    }
  });




  export const login = catchAsyncError(async (req,res,next)=>
  {
    const {email,password}= req.body;

    if(!email || !password )
    {
      return res.status(400).json({success:false , message:"email and password are required"})
    }


    const user = await User.findOne({email,accountVerified:true}).select("password");


    if(!user)
    {
      return res.status(400).json({success:false, message:"invalid email or password"})
    }


    const ispasswordmatched  = await user.comparepassword(password)

    if(!ispasswordmatched)
    {
      return res.status(400).json({success:false, message:"password is incorrect"})
    }


    sendToken(user,200,"user loggedin successfully",res);

  });


  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out successfully.",
      });
  });




  export const getUser = catchAsyncError(async(req,res,next)=>
  {
    const  user = req.user;
    res.status(200).json({
      success:true,
      user,
    });
  });





export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }
  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "MERN AUTHENTICATION APP RESET PASSWORD",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    // return next(
    //   new ErrorHandler(
    //     error.message ? error.message : "Cannot send reset password token.",
    //     500
    //   )
    // );


    return res.status(500).json({success:false,message:"cannot send reset password token"})

  }
});




export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const user = await User.findOne({
    resetpasswordToken: token,
    resetpasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    // return next(
    //   new ErrorHandler(
    //     "Reset password token is invalid or has been expired.",
    //     400
    //   )
    // );  

    return res.status(400).json({success:false,message:"reset password token is invalid or has been expired"})
  }

  if (req.body.password !== req.body.confirmPassword) {
    // return next(
    //   new ErrorHandler("Password & confirm password do not match.", 400)
    // );

    return res.status(400).json({success:false,message:"password and confirm password does not match"})

  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Reset Password Successfully.", res);
});