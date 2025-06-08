import React, { useContext } from "react";
import Hero from "../components/Hero";
import Instructor from "../components/Instructor";
import Technologies from "../components/working";
import "../styles/Home.css";
import { Navigate } from "react-router-dom";
import Footer from "../layout/Footer";
import { Context } from "../main";

const Home = () => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <>
      <section className="home">
        <Hero />
        <Instructor />
        <Technologies />
        <Footer />
      </section>
    </>
  );
};

export default Home;
