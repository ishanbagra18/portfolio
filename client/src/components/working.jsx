import React from "react";
import "../styles/working.css";

const Technologies = () => {
  return (
    <>
      <div className="working">
        <div className="working-how">
          <div className="working-how-one">
            <h1 className="heading1">HOW IT WORKS</h1>
            <h1 className="heading2">
              How to make AI-generated portfolios with ProFolio
            </h1>
            <p>
              Create effective portfolios fast, by generating a customizable
              design first. Then, edit it as much as needed. To get started,
              open the AI portfolio generator from inside Visme’s dashboard or
              template gallery. Use it to generate a stunning, ready-to-use
              design from your text prompts, in less than a minute.
            </p>
          </div>
          <div className="working-how-image"></div>
        </div>
      </div>

      {/* Extended Feature Section */}
      <div className="featuresection">
        <div className="featuresectionheading">
          <h1>Features of the AI Portfolio Generator</h1>
          <p>
            Transform the way you create portfolios with AI-powered automation.
            Whether you're a designer, developer, or freelancer, this tool helps
            you craft visually stunning, professional portfolios with minimal
            effort.
          </p>
        </div>

        <div className="feature-grid">
        <div className="feature-card">
  <h3>🚀 Instant Portfolio Creation</h3>
  <p>Generate a polished, ready-to-use portfolio in just minutes.</p>
</div>
<div className="feature-card">
  <h3>🎨 Customizable Templates</h3>
  <p>Choose from a variety of professionally designed layouts.</p>
</div>
<div className="feature-card">
  <h3>🤖 AI-Optimized Content</h3>
  <p>Receive AI-suggested content to enhance your profile.</p>
</div>
<div className="feature-card">
  <h3>📂 Easy File Integration</h3>
  <p>Seamlessly import projects and case studies into your portfolio.</p>
</div>

{/* New Features Added */}
<div className="feature-card">
  <h3>🌍 Multi-Device Access</h3>
  <p>Access and edit your portfolio anytime, anywhere.</p>
</div>
<div className="feature-card">
  <h3>🔍 SEO & Visibility Boost</h3>
  <p>Optimize your portfolio for better search engine ranking.</p>
</div>
<div className="feature-card">
  <h3>💾 Auto-Save & Backup</h3>
  <p>Never lose your progress with real-time auto-save.</p>
</div>
<div className="feature-card">
  <h3>📊 Analytics & Insights</h3>
  <p>Track your portfolio views and engagement metrics.</p>
</div>

        </div>
      </div>
    </>
  );
};

export default Technologies;
