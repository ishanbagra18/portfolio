import { catchAsyncError } from "./sdd.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    // return next(new ErrorHandler("User is not authenticated.", 400));
    return res.status(400).json({success:false , message:"user is not authenticated"})
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});





