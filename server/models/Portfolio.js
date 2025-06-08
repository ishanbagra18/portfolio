import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    portfolioName: { type: String, required: true },
    personalInfo: {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      email: { type: String, required: true, unique: true },
      language: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      experience: { type: Number, required: true },
    },
    projects: [
      {
        projectName: { type: String, required: true },
        projectDesc: { type: String, required: true }, 
        githubRepo: { type: String, required: true },
      },
    ],
    skills: [
      {
        skillName: { type: String, required: true },
        proficiency: { type: Number, required: true, min: 0, max: 100 },
      },
    ],
    education: {
      engineeringDegree: { type: String, required: true },
      college: { type: String, required: true },
      school: { type: String, required: true },
    },
    social: {
      instagram: { type: String },
      github: { type: String },
      linkedin: { type: String },
      gmail: { type: String },
    },
    competitiveProgramming: {
      leetcode: { type: String },
      leetcodeRating: { type: Number },
      codechef: { type: String },
      codechefRating: { type: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Portfolio", portfolioSchema);
