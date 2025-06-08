import Portfolio from "../models/Portfolio.js";
import { catchAsyncError } from "../middlewares/sdd.js";



export const createPortfolio = catchAsyncError(async (req, res, next) => {
  try {
    const {
      portfolioName,
      personalInfo,
      projects,
      skills,
      education,
      social,
      competitiveProgramming
    } = req.body.formData;
    
    console.log(req.body);

    console.log(portfolioName, personalInfo, projects, skills, education, social, competitiveProgramming);

    // Validate required fields
    // if (
    //   !portfolioName ||
    //   !personalInfo?.name || !personalInfo?.age || !personalInfo?.email || 
    //   !personalInfo?.language || !personalInfo?.phone || !personalInfo?.address || 
    //   !personalInfo?.experience ||
    //   !education?.engineeringDegree || !education?.college || !education?.school
    // ) {
    //   return res.status(400).json({ error: "All required fields must be provided" });
    // }
    console.log("Validated required fields");

    // // Validate phone number format
    // const validatePhoneNumber = (phone) => {
    //   const phoneRegex = /^\+91\d{10}$/; // Indian format: +91 followed by 10 digits
    //   return phoneRegex.test(phone);
    // };
    // console.log("Validated phone number format");

    // if (!validatePhoneNumber(personalInfo.phone)) {
    //   return res.status(400).json({ error: "Invalid phone number format" });
    // }
    console.log("Validated phone number format")

    // Create a new portfolio
    const portfolio = await Portfolio.create({
      portfolioName,    
      personalInfo,
      projects,
      skills,
      education,
      social,
      competitiveProgramming
    });
    console.log("Created a new portfolio");

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      portfolio,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
});


export const getPortfolio = catchAsyncError(async (req, res, next) => {

  console.log("Fetching portfolio data..."); // ✅ Debugging line to check if the function is called
  try {
    const { email } = req.query.email ? req.query : req.user; 
    console.log("Email from query:", email); // ✅ Debugging line to check the email value

    // Fetch portfolio data based on the provided email or the authenticated user's email
    const portfolio = await Portfolio.findOne({ "personalInfo.email": email });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
);