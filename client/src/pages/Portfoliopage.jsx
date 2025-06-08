"use client"; // ✅ Added this line to indicate that this file is a client-side React component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ FIX: Removed incorrect `data` import
import axios from "axios";
import StartingPage from "../components/P_comps/Startingpage";
import Navbar from "../components/P_comps/Navbar";
import Aboutme from "../components/P_comps/Aboutme";
import Skills from "../components/P_comps/Skills";
import EducationProjects from "../components/P_comps/EducationProjects";
import CodingProfiles from "../components/P_comps/CodingProfiles";
import ContactSection from "../components/P_comps/ContactSection";

function Portfolio() {
  const { email } = useParams(); // ✅ Get email from URL if available
  console.log(email)
  // console.log("Email from URL:", email); // ✅ Debugging line to check the email value
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const [error, setError] = useState(null); // ✅ Added error state

  useEffect(() => {   
    const fetchPortfolio = async () => {
      try {
        const url = email
          ? `http://localhost:4000/api/v1/portfolio/${email}`
          : "http://localhost:4000/api/v1/portfolio";



        const response = await axios.get(url);
        console.log("Fetched portfolio data:", response.data);
        setPortfolioData(response.data.portfolio);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setError("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [email]);

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="pt-20">
        <StartingPage data={portfolioData} />
        <div id="aboutme"><Aboutme data={portfolioData?.personalInfo || {}} /></div>
        <div id="skills"><Skills data={portfolioData?.skills || []} /></div>
        <div id="education-projects">
  <EducationProjects 
    education={portfolioData?.education || {}} 
    projects={portfolioData?.projects || []} 
  />
</div>
        <div id="coding-profiles"><CodingProfiles data={portfolioData?.competitiveProgramming || []} /></div>
        <div id="contact"><ContactSection data={portfolioData?.social || {}} /></div>
      </div>
    </>
  );
}

export default Portfolio;
