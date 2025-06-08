import React, { useState } from "react";
import "../styles/Instructor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";  



const Instructor = () => {


  const navigate = useNavigate();  





  const [formData, setFormData] = useState({
    portfolioName: "",
    personalInfo: {
      name: "",
      age: "",
      email: "",
      language: "",
      phone: "", 
      address: "",
      experience: "",
    },
    projects: [
      { projectName: "", projectDesc: "", githubRepo: "" },
      { projectName: "", projectDesc: "", githubRepo: "" },
      { projectName: "", projectDesc: "", githubRepo: "" },
    ],         
    skills: [
      { skillName: "", proficiency: "" },
      { skillName: "", proficiency: "" },
      { skillName: "", proficiency: "" },
    ],
    education: {
      engineeringDegree: "",
      college: "",
      school: "",
    },
    social: {
      instagram: "",
      github: "",
      linkedin: "",
      gmail: "",
    },
    competitiveProgramming: {
      leetcode: "",
      leetcodeRating: "",
      codechef: "",
      codechefRating: "",
    },
  });

  // Handle input change (for personalInfo & top-level fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (formData.personalInfo.hasOwnProperty(name)) {
      handleNestedChange("personalInfo", name, value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle nested state updates (education, social, competitiveProgramming)
  const handleNestedChange = (category, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  // Handle project input
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      projects: newProjects,
      
    }));
  };

  // Handle skills input
  const handleSkillsChange = (index, field, value) => {
    const newSkills = [...formData.skills];
    newSkills[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }));
  };



  


  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/createPortfolio",
         {formData} ,
        { withCredentials: true }
      );

      console.log(response);
      const data = response.data;

      if (data.success) {
        alert("Portfolio saved successfully!");

        const email = formData.personalInfo.email;
        
        // Navigate with email if available, otherwise go to default page
        navigate(email ? `/portfoliopage/${encodeURIComponent(email)}` : "/portfoliopage");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      alert("Error saving portfolio. Please try again.");
      console.log(error);
    }
  };






  return (
    <div className="instructor-page">
      <h1 className="instructor-mainheading">Fill your portfolio details</h1>
      <form className="portfolio-container" onSubmit={handleSubmit}>
        {/* Portfolio Name */}
        <div className="portfolio-form portfolio-basic">
          <h2>Portfolio Name</h2>
          <div className="form-section">
            <label htmlFor="portfolioName">Portfolio Name:</label>
            <input
              type="text"
              id="portfolioName"
              name="portfolioName"
              className="input-text"
              placeholder="Enter portfolio name"
              value={formData.portfolioName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="portfolio-form portfolio-personal">
          <h2>Personal Information</h2>
          {Object.keys(formData.personalInfo).map((field) => (
            <div className="form-section" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type={field === "age" || field === "experience" ? "number" : "text"}
                name = {field}
                className="input-text"
                placeholder={`Enter ${field}`}
                value={formData.personalInfo[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="portfolio-form portfolio-projects">
          <h2>My Projects</h2>
          {formData.projects.map((project, index) => (
            <div className="form-section" key={index}>
              <label>Project {index + 1} Name:</label>
              <input
                type="text"
                className="input-text"
                placeholder="Enter project name"
                value={project.projectName}
                onChange={(e) => handleProjectChange(index, "projectName", e.target.value)}
                required
              />
              <label>Project Description:</label>
              <textarea
                className="input-textarea"
                placeholder="Enter project description"
                value={project.projectDesc}
                onChange={(e) => handleProjectChange(index, "projectDesc", e.target.value)}
                required
              />
              <label>GitHub Repository Link:</label>
              <input
                type="url"
                className="input-text"
                placeholder="Enter GitHub repo link"
                value={project.githubRepo}
                onChange={(e) => handleProjectChange(index, "githubRepo", e.target.value)}
                required
              />
            </div>
          ))}
        </div>





        
         {/* Skills */}
         <div className="portfolio-form portfolio-skills">
          <h2>My Skills</h2>
          {formData.skills.map((skill, index) => (
            <div className="form-section" key={index}>
              <label>Skill {index + 1} Name:</label>
              <input
                type="text"
                className="input-text"
                placeholder="Enter skill name"
                value={skill.skillName}
                onChange={(e) => handleSkillsChange(index, "skillName", e.target.value)}
                required
              />
              <label>Proficiency (0-100):</label>
              <input
                type="number"
                className="input-text"
                placeholder="Enter proficiency level"
                value={skill.proficiency}
                onChange={(e) => handleSkillsChange(index, "proficiency", e.target.value)}
                required
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>

















        {/* Education */}
        <div className="portfolio-form portfolio-education">
          <h2>Education</h2>
          <div className="form-section">
            <label>Engineering Degree:</label>
            <input
              type="text"
              className="input-text"
              placeholder="Enter engineering degree"
              value={formData.education.engineeringDegree}
              onChange={(e) => handleNestedChange("education", "engineeringDegree", e.target.value)}
              required
            />
          </div>
          <div className="form-section">
            <label>College:</label>
            <input
              type="text"
              className="input-text"
              placeholder="Enter college name"
              value={formData.education.college}
              onChange={(e) => handleNestedChange("education", "college", e.target.value)}
              required
            />
          </div>
          <div className="form-section">
            <label>School:</label>
            <input
              type="text"
              className="input-text"
              placeholder="Enter school name"
              value={formData.education.school}
              onChange={(e) => handleNestedChange("education", "school", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Social Profiles */}
        <div className="portfolio-form portfolio-social">
          <h2>Social Profiles</h2>
          <div className="form-section">
            <label>Instagram:</label>
            <input
              type="url"
              className="input-text"
              placeholder="Enter Instagram profile link"
              value={formData.social.instagram}
              onChange={(e) => handleNestedChange("social", "instagram", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>GitHub:</label>
            <input
              type="url"
              className="input-text"
              placeholder="Enter GitHub profile link"
              value={formData.social.github}
              onChange={(e) => handleNestedChange("social", "github", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>LinkedIn:</label>
            <input
              type="url"
              className="input-text"
              placeholder="Enter LinkedIn profile link"
              value={formData.social.linkedin}
              onChange={(e) => handleNestedChange("social", "linkedin", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>Gmail:</label>
            <input
              type="email"
              className="input-text"
              placeholder="Enter Gmail address"
              value={formData.social.gmail}
              onChange={(e) => handleNestedChange("social", "gmail", e.target.value)}
            />
          </div>
        </div>

        {/* Competitive Programming Profiles */}
        <div className="portfolio-form portfolio-cp">
          <h2>Competitive Programming Profiles</h2>
          <div className="form-section">
            <label>LeetCode Profile:</label>
            <input
              type="text"
              className="input-text"
              placeholder="Enter LeetCode profile link"
              value={formData.competitiveProgramming.leetcode}
              onChange={(e) => handleNestedChange("competitiveProgramming", "leetcode", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>LeetCode Rating:</label>
            <input
              type="number"
              className="input-text"
              placeholder="Enter LeetCode rating"
              value={formData.competitiveProgramming.leetcodeRating}
              onChange={(e) => handleNestedChange("competitiveProgramming", "leetcodeRating", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>CodeChef Profile:</label>
            <input
              type="text"
              className="input-text"
              placeholder="Enter CodeChef profile link"
              value={formData.competitiveProgramming.codechef}
              onChange={(e) => handleNestedChange("competitiveProgramming", "codechef", e.target.value)}
            />
          </div>
          <div className="form-section">
            <label>CodeChef Rating:</label>
            <input
              type="number"
              className="input-text"
              placeholder="Enter CodeChef rating"
              value={formData.competitiveProgramming.codechefRating}
              onChange={(e) => handleNestedChange("competitiveProgramming", "codechefRating", e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-container">
          <button type="submit" className="submit-button">
            Submit Portfolio
          </button>
        </div>
      </form>
    </div>
  );
};

export default Instructor;
