import React from "react";
import PropTypes from "prop-types";
import { FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const ContactSection = ({ data }) => {
  return (
    <>
      <style>
        {`
          .contact-container {
            background-color: black;
            color: white;
            width: 100%;  
            padding: 80px 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
          }

.contact-heading-container {
  position: absolute;
  top: 0%; /* Adjusted to ensure it's visible */
  left: 40%;
  transform: translateX(-50%);
  padding: 16px 24px;
  text-align: center; /* Ensure text is centered */
}

.contact-heading-background {
  font-size: 8rem; /* Reduced size to prevent overlap */
  font-weight: 800;
  color: gray;
  opacity: 0.2;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Perfectly centers the background text */
  z-index: 0; /* Keeps it in the background */
  white-space: nowrap; /* Prevents text from wrapping */
}

.contact-heading {
  position: relative;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  z-index: 1; /* Ensures foreground text is above */
  color: white;
}






          .highlight {
            color: yellow;
          }
          .contact-left {
            width: 45%;
          }
          .contact-left h2 {
            font-size: 2rem;
            font-weight: bold;
          }
          .contact-left p {
            color: gray;
            margin-top: 16px;
          }
          .social-icons {
            display: flex;
            gap: 24px;
            margin-top: 24px;
          }
          .social-icons a {
            font-size: 2rem;
            color: gray;
            transition: color 0.3s;
          }
          .social-icons a:hover {
            color: yellow;
          }
          .contact-right {
            width: 45%;
          }
          .form-group {
            display: flex;
            gap: 16px;
            margin-bottom: 16px;
          }
          .contact-input {
            width: 100%;
            padding: 12px;
            background-color: #333;
            border: none;
            border-radius: 6px;
            color: white;
          }
          .contact-textarea {
            width: 100%;
            padding: 12px;
            background-color: #333;
            border: none;
            border-radius: 6px;
            color: white;
            height: 100px;
            resize: none;
          }
          .send-button {
            background-color: yellow;
            color: black;
            padding: 12px 24px;
            font-weight: bold;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: background 0.3s;
          }
          .send-button:hover {
            background-color: gold;
          }
        `}
      </style>

      <div className="contact-container">
        {/* Centered Heading */}
        <div className="contact-heading-container">
          <h2 className="contact-heading-background">CONTACT</h2>
          <h2 className="contact-heading">
            GET IN <span className="highlight">TOUCH</span>
          </h2>
        </div>

        {/* Left Side */}
        <div className="contact-left">
          <h2>DON'T BE SHY!</h2>
          <p>
            Feel free to get in touch with me. I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          {/* Social Icons */}
          <div className="social-icons">
            {data.instagram && (
              <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
            {data.gmail && (
              <a href={`mailto:${data.gmail}`}>
                <FaEnvelope />
              </a>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-right">
          <form>
            <div className="form-group">
              <input type="text" placeholder="Your Name" className="contact-input" />
              <input type="email" placeholder="Your Email" className="contact-input" />
            </div>
            <input type="text" placeholder="Your Subject" className="contact-input" />
            <textarea placeholder="Your Message" className="contact-textarea"></textarea>

            {/* Send Button */}
            <button className="send-button">SEND MESSAGE ✈️</button>
          </form>
        </div>
      </div>
    </>
  );
};

// PropTypes Validation
ContactSection.propTypes = {
  data: PropTypes.shape({
    instagram: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
    gmail: PropTypes.string,
  }),
};

// Default Props to Prevent Errors if Data is Missing
ContactSection.defaultProps = {
  data: {},
};

export default ContactSection;
