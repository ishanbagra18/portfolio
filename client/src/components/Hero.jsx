import React, { useContext } from "react";
import "../styles/Hero.css";
import { Context } from "../main";
import { toast } from "react-toastify";
import axios from "axios";

const Hero = () => {
  const { user, setIsAuthenticated, setUser } = useContext(Context);

  const logout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.error(err);
      });
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-logo">
          <img src="/cv.png" alt="Portfolio Logo" />
          <h1>ProFolio</h1>
        </div>

        <h4 className="hero-mainheading">Hello, {user ? user.name : "Developer"}</h4>

        <h2 className="hero-paragraph">
          Welcome to the Portfolio Generator! Fill in your details, and your portfolio will be automatically created.
        </h2>

        <img className="heroimage" src="heroimage.jpeg" alt="Hero" width="100" height="100" />

        {/* Logout Button is now inside Hero */}
        <button className="hero-logout-btn" onClick={logout}>Logout</button>
      </div>
    </>
  );
};

export default Hero;
