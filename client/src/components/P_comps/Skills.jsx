import React from "react";

const skills = [
  { name: "JavaScript", percentage: 89 },
  { name: "Node.js", percentage: 75 },
  { name: "React.js", percentage: 80 },
  { name: "CSS", percentage: 70 },
  { name: "HTML", percentage: 90 },
  { name: "Angular", percentage: 65 },
];

const Skills = () => {
  return (
    <>
      <style>
        {`
          .skills-container {
            background-color: black;
            color: white;
            width: 100%;
            padding: 80px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .skills-heading-container {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .skills-heading-background {
            position: absolute;
            bottom: 0;
            font-size: 10rem;
            font-weight: 800;
            color: gray;
            opacity: 0.2;
            text-transform: uppercase;
          }
          .skills-heading {
            position: relative;
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
          }
          .highlight {
            color: yellow;
          }
          .skills-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
            margin-top: 50px;
          }
          .skill-item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .skill-svg {
            width: 130px;
            height: 130px;
            position: relative;
          }
          .skill-percentage {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
          }
          .skill-name {
            margin-top: 10px;
            font-size: 1.3rem;
          }
        `}
      </style>

      <div className="skills-container">
        <div className="skills-heading-container">
          {/* Background Text */}
          <h2 className="skills-heading-background">RESUME</h2>

          {/* Foreground Text */}
          <h2 className="skills-heading">
            MY <span className="highlight">SKILLS</span>
          </h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-svg">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#222" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="yellow"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (skill.percentage / 100) * 251.2}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="skill-percentage">{skill.percentage}%</span>
              </div>
              <p className="skill-name">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
