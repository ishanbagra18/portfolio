import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const EducationProjects = ({ education, projects }) => {
  // Convert education object to an array
  const educationList = [
    { title: "Engineering Degree", desc: education.engineeringDegree, place: "IIIT Kota", year: "2022 - Present" },
    { title: "College", desc: education.college, place: "XYZ College", year: "2020 - 2022" },
    { title: "School", desc: education.school, place: "XYZ High School", year: "2008 - 2020" },
  ];

  return (
    <>
      <style>
        {`
          .education-projects {
            background-color: black;
            color: white;
            width: 100%;
            padding: 100px 50px;
          }
          .heading {
            font-size: 40px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 60px;
          }
          .heading span {
            color: yellow;
          }
          .grid-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
          .section {
            padding-left: 20px;
          }
          .card {
            border-left: 4px solid yellow;
            padding-left: 20px;
            margin-bottom: 30px;
          }
          .card h3 {
            font-size: 24px;
            font-weight: bold;
            color: yellow;
          }
          .card p {
            color: white;
          }
          .card .place-year {
            color: gray;
          }
          .project-link {
            color: gray;
            text-decoration: underline;
            display: inline-block;
            margin-top: 5px;
          }
          .project-link:hover {
            color: yellow;
          }
        `}
      </style>

      <div className="education-projects">
        {/* Heading */}
        <h2 className="heading">
          EDUCATION <span>& MY PROJECTS</span>
        </h2>

        <div className="grid-container">
          {/* Education Section */}
          <div className="section">
            {educationList.map((edu, index) => (
              <div key={index} className="card">
                <h3>{edu.title}</h3>
                <p>{edu.desc}</p>
                <p className="place-year">{edu.place} | {edu.year}</p>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="section">
            {projects.map((project, index) => (
              <div key={index} className="card">
                <h3>{project.projectName}</h3>
                <p>{project.projectDesc}</p>
                <a
                  href={project.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  🔗 GitHub Repository
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ✅ Add PropTypes Validation
EducationProjects.propTypes = {
  education: PropTypes.shape({
    engineeringDegree: PropTypes.string.isRequired,
    college: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
  }).isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      projectName: PropTypes.string.isRequired,
      projectDesc: PropTypes.string.isRequired,
      githubRepo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EducationProjects;
