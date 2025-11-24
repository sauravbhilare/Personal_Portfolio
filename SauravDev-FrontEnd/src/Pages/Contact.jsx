import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../style/Contact.css";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="contact-content">
        <div className="contact-container">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-description">
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out - I'd love to hear from you!
          </p>

          <div className="contact-row">
            <div className="contact-col">
              <div className="contact-info">
                <h3>Contact Information</h3>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Location:</h4>
                    <p>Mumbai, India</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h4>Email:</h4>
                    <a href="mailto:sauravbhilare43@gmail.com">
                      sauravbhilare43@gmail.com
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="info-content">
                    <h4>Phone:</h4>
                    <a href="tel:+919834873769">+91 9834873769</a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-content">
                    <h4>Available:</h4>
                    <p>Monday - Friday: 9am - 6pm</p>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="social-links">
                  <h4>Connect with me:</h4>
                  <div className="social-icons">
                    <a
                      href="https://wa.me/919834873769"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link whatsapp"
                      title="WhatsApp"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/saurav-bhilare-98b394269/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link linkedin"
                      title="LinkedIn"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="https://github.com/sauravbhilare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link github"
                      title="GitHub"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Removed Contact Form Column */}
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9751246193314!2d72.88689311103886!3d19.0648312820629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8985c2ca969%3A0x44213bccfda36c6a!2sHerumb%20Sahakari%20Gruhnirman%20Samstha%20Maryadit!5e0!3m2!1sen!2sin!4v1753111675037!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
