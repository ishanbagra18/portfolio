import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const Aboutme = ({ data }) => {
  const styles = {
    container: {
      backgroundColor: "black",
      color: "white",
      width: "100%",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 5rem",
    },
    headingWrapper: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "2rem",
    },
    backgroundText: {
      position: "absolute",
      fontSize: "9rem",
      fontWeight: "800",
      color: "gray",
      opacity: "0.3",
      textTransform: "uppercase",
    },
    foregroundText: {
      position: "relative",
      fontSize: "4rem",
      fontWeight: "700",
      color: "#FACC15",
      textAlign: "center",
    },
    spanWhite: {
      color: "white",
    },
    contentWrapper: {
      display: "flex",
      width: "100%",
      height: "75%",
    },
    leftSide: {
      width: "50%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "2rem",
      fontSize: "1.5rem",
    },
    rightSide: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    experienceBox: {
      textAlign: "center",
    },
    experienceNumber: {
      fontSize: "6rem",
      fontWeight: "bold",
      color: "#FACC15",
    },
    experienceText: {
      fontSize: "2rem",
      marginTop: "1rem",
    },
    infoText: {
      marginBottom: "10px",
    },
    label: {
      color: "#FACC15",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      {/* Heading */}
      <div style={styles.headingWrapper}>
        <h2 style={styles.backgroundText}>PERSONAL INFORMATION</h2>
        <h2 style={styles.foregroundText}>
          ABOUT <span style={styles.spanWhite}>ME</span>
        </h2>
      </div>

      <div style={styles.contentWrapper}>
        {/* Left Side - Personal Info */}
        <div style={styles.leftSide}>
          <p style={styles.infoText}>
            <span style={styles.label}>Name:</span> {data.name || "N/A"}
          </p>
          <p style={styles.infoText}>
            <span style={styles.label}>Age:</span> {data.age || "N/A"}
          </p>
          <p style={styles.infoText}>
            <span style={styles.label}>Phone:</span> {data.phone || "N/A"}
          </p>
          <p style={styles.infoText}>
            <span style={styles.label}>Languages:</span> {data.languages || "N/A"}
          </p>
          <p style={styles.infoText}>
            <span style={styles.label}>Email:</span> {data.email || "N/A"}
          </p>
          <p style={styles.infoText}>
            <span style={styles.label}>Address:</span> {data.address || "N/A"}
          </p>
        </div>

        {/* Right Side - Experience */}
        <div style={styles.rightSide}>
          <div style={styles.experienceBox}>
            <h1 style={styles.experienceNumber}>{data.experience || 0}</h1>
            <p style={styles.experienceText}>Years of Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
Aboutme.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    phone: PropTypes.string,
    languages: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

// Default props to avoid undefined errors
Aboutme.defaultProps = {
  data: {},
};

export default Aboutme;
