import React from "react";
import { Link } from "react-scroll";

const Navbar = () => {
  const styles = {
    nav: {
      backgroundColor: "black",
      color: "white",
      padding: "16px 0",
      position: "fixed",
      width: "100%",
      top: "0",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "50",
      height: "80px",
      display: "flex",
      justifyContent: "center",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "90%",
      maxWidth: "1200px",
    },
    logo: {
      fontSize: "1.875rem",
      fontWeight: "bold",
      color: "#FACC15",
    },
    navList: {
      display: "flex",
      gap: "24px",
      fontSize: "1.125rem",
    },
    navItem: {
      cursor: "pointer",
      transition: "color 0.3s",
    },
    navItemHover: {
      color: "#FACC15",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo */}
        <h1 style={styles.logo}>Portfolio</h1>

        {/* Navigation Links */}
        <ul style={styles.navList}>
          {["aboutme", "skills", "education-projects", "coding-profiles", "contact"].map(
            (section, index) => (
              <li key={index}>
                <Link
                  to={section}
                  smooth={true}
                  duration={500}
                  style={styles.navItem}
                  onMouseOver={(e) => (e.target.style.color = styles.navItemHover.color)}
                  onMouseOut={(e) => (e.target.style.color = "white")}
                >
                  {section.replace("-", " ").toUpperCase()}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
