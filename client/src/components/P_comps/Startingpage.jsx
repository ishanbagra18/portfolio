import React from "react";
import PropTypes from "prop-types";

const StartingPage = ({ data = {} }) => {
  console.log(data);

  const styles = {
    container: {
      backgroundColor: "black",
      color: "white",
      width: "100%",
      height: "100vh",
      display: "flex",
    },
    leftSide: {
      width: "40%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    rightSide: {
      width: "60%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
    },
    heading: {
      color: "#FACC15",
      fontSize: "4rem",
      fontWeight: "bold",
      marginBottom: "10px",
      fontFamily: "'Bebas Neue', sans-serif",
      textShadow:
        "4px 4px 0px rgba(0, 0, 0, 0.5), 6px 6px 0px rgba(0, 0, 0, 0.3)",
    },
    subHeading: {
      fontSize: "2rem",
      fontWeight: "bold",
      letterSpacing: "10px",
    },
    paragraph: {
      color: "#D1D5DB",
      marginTop: "16px",
      maxWidth: "600px",
      fontSize: "1.5rem",
      fontFamily: "'Bebas Neue', cursive",
      textAlign: "center",
    },
    button: {
      marginTop: "24px",
      padding: "10px 24px",
      border: "2px solid #FACC15",
      color: "#FACC15",
      borderRadius: "9999px",
      cursor: "pointer",
      background: "transparent",
      fontSize: "1rem",
      transition: "background 0.3s, color 0.3s",
    },
    buttonHover: {
      background: "#FACC15",
      color: "black",
    },
  };

  return (
    <div style={styles.container}>
      {/* Left Side (40%) */}
      <div style={styles.leftSide}>
        <img
          src="/startingpageimage.png"
          alt="Hero"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </div>

      {/* Right Side (60%) */}
      <div style={styles.rightSide}>
        <h1 style={styles.heading}>
          I'M {data?.portfolioName || "STEVE MILNER"}.
        </h1>
        <h2 style={styles.subHeading}>WEB DESIGNER</h2>
        <p style={styles.paragraph}>
          I'm a web designer & front-end developer focused on crafting clean &
          user-friendly experiences. Passionate about building excellent
          software that improves lives.
        </p>

        <button
          style={styles.button}
          onMouseOver={(e) => {
            e.target.style.background = styles.buttonHover.background;
            e.target.style.color = styles.buttonHover.color;
          }}
          onMouseOut={(e) => {
            e.target.style.background = styles.button.background;
            e.target.style.color = styles.button.color;
          }}
        >
          More About Me →
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
StartingPage.propTypes = {
  data: PropTypes.shape({
    portfolioName: PropTypes.string,
  }),
};

export default StartingPage;
