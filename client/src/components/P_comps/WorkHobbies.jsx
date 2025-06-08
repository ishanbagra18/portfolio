import React from "react";

const WorkHobbies = () => {
  return (
    <div className="bg-black text-white py-20 px-16 h-[800px]">
      {/* Heading with Background Text */}
      <div className="relative flex justify-center items-center mb-16">
        <h2 className="absolute text-[10rem] font-extrabold text-gray-500 opacity-20 uppercase">
          Experience
        </h2>
        <h2 className="relative text-6xl font-bold text-white text-center">
          WORK <span className="text-yellow-400">EXPERIENCE</span> & HOBBIES
        </h2>
      </div>

      {/* Work Experience & Hobbies Section */}
      <div className="flex justify-between gap-12">
        {/* Work Experience (Left Side) */}
        <div className="w-1/2">
          <h3 className="text-4xl font-bold text-yellow-400">Work Experience</h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-2xl font-semibold">Software Developer Intern</h4>
              <p className="text-gray-400">XYZ Tech | June 2024 - Aug 2024</p>
              <p className="text-gray-300 mt-2">
                Worked on optimizing backend APIs and improved system performance by 30%. Developed interactive UI components using React.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold">Freelance Web Developer</h4>
              <p className="text-gray-400">Self-Employed | 2023 - Present</p>
              <p className="text-gray-300 mt-2">
                Built custom websites for small businesses using React, Tailwind CSS, and Firebase. Managed full-stack development and deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Hobbies (Right Side) */}
        <div className="w-1/2">
          <h3 className="text-4xl font-bold text-yellow-400">Hobbies</h3>
          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-2xl font-semibold">Coding & Problem Solving</h4>
              <p className="text-gray-300">
                Enjoy solving coding challenges on LeetCode and participating in hackathons.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold">Reading Tech Blogs</h4>
              <p className="text-gray-300">
                Passionate about staying updated with the latest tech trends and AI advancements.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold">Gaming & Strategy</h4>
              <p className="text-gray-300">
                Love playing strategy-based games like Chess and Age of Empires.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHobbies;
