import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

const CodingProfiles = ({ data }) => {
  const styles = {
    container: {
      backgroundColor: "black",
      color: "white",
      width: "100%",
      padding: "6rem 7rem",
      height: "600px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "4rem",
    },
    yellowText: {
      color: "#FACC15",
    },
    flexContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "5rem",
    },
    section: {
      width: "50%",
      borderLeft: "4px solid",
      paddingLeft: "2rem",
    },
    leetcodeBorder: {
      borderColor: "#3B82F6", // Blue-400
    },
    codechefBorder: {
      borderColor: "#FACC15", // Yellow-400
    },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    leetcodeText: {
      color: "#3B82F6", // Blue-400
    },
    codechefText: {
      color: "#FACC15", // Yellow-400
    },
    ratingText: {
      fontSize: "1.25rem",
      marginTop: "0.5rem",
    },
    link: {
      color: "gray",
      textDecoration: "underline",
      display: "inline-block",
      marginTop: "0.5rem",
    },
    linkHover: {
      color: "#FACC15", // Yellow-400 (LeetCode)
    },
    linkHoverBlue: {
      color: "#3B82F6", // Blue-400 (CodeChef)
    },
  };

  return (
    <div style={styles.container}>
      {/* Heading */}
      <h2 style={styles.heading}>
        <span style={styles.yellowText}>Competitive Coding</span> Profiles
      </h2>

      <div style={styles.flexContainer}>
        {/* LeetCode Section */}
        <div style={{ ...styles.section, ...styles.leetcodeBorder }}>
          <h3 style={{ ...styles.sectionTitle, ...styles.leetcodeText }}>LeetCode</h3>
          <p style={styles.ratingText}>
            <span style={styles.yellowText}>Rating:</span> {data?.leetcodeRating || "N/A"}
          </p>
          <a
            href={data?.leetcode || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseOut={(e) => (e.target.style.color = "gray")}
          >
            🔗 View LeetCode Profile
          </a>
        </div>

        {/* CodeChef Section */}
        <div style={{ ...styles.section, ...styles.codechefBorder }}>
          <h3 style={{ ...styles.sectionTitle, ...styles.codechefText }}>CodeChef</h3>
          <p style={styles.ratingText}>
            <span style={styles.leetcodeText}>Rating:</span> {data?.codechefRating || "N/A"}
          </p>
          <a
            href={data?.codechef || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = styles.linkHoverBlue.color)}
            onMouseOut={(e) => (e.target.style.color = "gray")}
          >
            🔗 View CodeChef Profile
          </a>
        </div>
      </div>
    </div>
  );
};

// ✅ Add PropTypes for props validation
CodingProfiles.propTypes = {
  data: PropTypes.shape({
    leetcode: PropTypes.string,
    leetcodeRating: PropTypes.number,
    codechef: PropTypes.string,
    codechefRating: PropTypes.number,
  }),
};

// ✅ Provide default props to prevent errors when data is undefined
CodingProfiles.defaultProps = {
  data: {},
};

export default CodingProfiles;
