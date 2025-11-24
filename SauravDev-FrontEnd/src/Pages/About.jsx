import React, { useEffect, useRef, useState } from "react";
import "../style/About.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import useImg from "../assets/PHOTOS.jpeg";
import Resume from "../assets/SauravBhilareFrontDevResume.pdf";

const About = () => {
  const skillRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  const skillsData = {
    frontend: [
      { name: "HTML5", level: 80, icon: "fab fa-html5", color: "#E34F26" },
      { name: "CSS3", level: 70, icon: "fab fa-css3-alt", color: "#1572B6" },
      { name: "JavaScript", level: 40, icon: "fab fa-js", color: "#F7DF1E" },
      { name: "React.js", level: 30, icon: "fab fa-react", color: "#61DAFB" },
      {
        name: "Bootstrap",
        level: 60,
        icon: "fab fa-bootstrap",
        color: "#7952B3",
      },
    ],
    backend: [
      { name: "SQL", level: 40, icon: "fas fa-database", color: "#4479A1" },
      { name: ".NET", level: 40, icon: "fab fa-microsoft", color: "#512BD4" },
      {
        name: "Express.js",
        level: 30,
        icon: "fas fa-server",
        color: "#000000",
      },
      { name: "Node.js", level: 30, icon: "fab fa-node-js", color: "#339933" },
      { name: "MongoDB", level: 30, icon: "fas fa-database", color: "#47A248" },
    ],
    programming: [
      { name: "C#", level: 30, icon: "fas fa-code", color: "#239120" },
      { name: "Git", level: 50, icon: "fab fa-git-alt", color: "#F05032" },
      { name: "GitHub", level: 60, icon: "fab fa-github", color: "#181717" },
      { name: "REST API", level: 40, icon: "fas fa-cloud", color: "#FF6B35" },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      skillRefs.current.forEach((bar, index) => {
        if (bar) {
          const skill = Object.values(skillsData).flat()[index];
          if (skill) {
            bar.style.width = "0";
            setTimeout(() => {
              bar.style.transition = `width 1.5s ease-in-out ${index * 0.1}s`;
              bar.style.width = `${skill.level}%`;
              bar.style.backgroundColor = skill.color;
            }, 200);
          }
        }
      });
    }
  }, [isVisible]);

  // FIXED: Download Resume Function
  const downloadResume = () => {
    try {
      // Method 1: Using the imported Resume directly (Recommended)
      const link = document.createElement("a");
      link.href = Resume; // ✅ Fixed: Removed curly braces
      link.download = "Saurav_Bhilare_Frontend_Developer_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);

      // Fallback method
      window.open(Resume, "_blank");
    }
  };

  // Alternative Method 2: If Method 1 doesn't work
  const downloadResumeAlternative = () => {
    // Create a blob URL for better compatibility
    fetch(Resume)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Saurav_Bhilare_Frontend_Developer_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading resume:", error);
        // Final fallback - open in new tab
        window.open(Resume, "_blank");
      });
  };

  const contactMe = () => {
    window.location.href = "/contact";
  };

  return (
    <>
      <Navbar />
      <div className="about-main-content" ref={aboutRef}>
        <div className="about-container">
          {/* Original Header Section */}
          <h1 className="about-title">About Me</h1>
          <p className="about-description">
            Passionate Fullstack Web Developer proficient in building end-to-end
            web applications, handling everything from responsive user
            interfaces to server-side logic and database integration.
          </p>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="download-btn" onClick={downloadResume}>
              <i className="fas fa-download"></i>
              Download Resume
            </button>
            {/* Optional: Add alternative button for testing */}
            {/* <button className="download-btn-alt" onClick={downloadResumeAlternative} style={{marginLeft: '10px'}}>
              <i className="fas fa-download"></i>
              Download (Alt)
            </button> */}
          </div>

          {/* Rest of your component remains the same */}
          <div className="about-content">
            <div className="about-img">
              <img src={useImg} alt="Saurav Bhilare" />
            </div>
            <div className="about-text">
              <h2>Fullstack Web Developer</h2>
              <div className="personal-info">
                <div className="info-column">
                  <div className="info-item">
                    <span className="info-label">Birthday:</span>
                    <span className="info-value">04 March 2000</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Age:</span>
                    <span className="info-value">25</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Website:</span>
                    <span className="info-value">-</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Degree:</span>
                    <span className="info-value">B-Tech</span>
                  </div>
                </div>
                <div className="info-column">
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">+91 9834873769</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">
                      sauravbhilare43@gmail.com
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">City:</span>
                    <span className="info-value">Mumbai, India</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Freelance:</span>
                    <span className="info-value available">Available</span>
                  </div>
                </div>

                <div className="about-story">
                  <p>
                    I'm a{" "}
                    <span className="highlight">
                      passionate and detail-oriented web developer
                    </span>{" "}
                    with over 1+ year of hands-on experience in building
                    responsive and user-friendly websites. I specialize in{" "}
                    <span className="highlight">
                      HTML, CSS, JavaScript, C#, and .NET
                    </span>
                    . During my time at Masys Tech Solution Pvt. Ltd., I worked
                    as a Junior Developer and Intern, where I contributed to
                    both front-end and back-end development of real-world
                    applications.
                  </p>
                  <p>
                    Currently, I'm upskilling in the{" "}
                    <span className="highlight">MERN stack</span> (MongoDB,
                    Express.js, React.js, Node.js) to expand my full-stack
                    development capabilities. I enjoy learning new technologies,
                    writing clean code, and collaborating with teams to build
                    scalable web solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section with Filter */}
          <div className="skills-section">
            <h2 className="skills-title">My Skills</h2>

            {/* Skills Filter */}
            <div className="skills-filter">
              <button
                className={`filter-btn ${
                  activeCategory === "all" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("all")}
              >
                All Skills
              </button>
              <button
                className={`filter-btn ${
                  activeCategory === "frontend" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("frontend")}
              >
                Frontend
              </button>
              <button
                className={`filter-btn ${
                  activeCategory === "backend" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("backend")}
              >
                Backend
              </button>
              <button
                className={`filter-btn ${
                  activeCategory === "programming" ? "active" : ""
                }`}
                onClick={() => setActiveCategory("programming")}
              >
                Tools & Others
              </button>
            </div>

            <div className="skills-container">
              {Object.entries(skillsData).map(
                ([category, skills]) =>
                  (activeCategory === "all" || activeCategory === category) && (
                    <div key={category} className="skill-category">
                      <h3>
                        <i
                          className={`${
                            category === "frontend"
                              ? "fas fa-palette"
                              : category === "backend"
                              ? "fas fa-server"
                              : "fas fa-tools"
                          }`}
                        ></i>
                        {category === "frontend"
                          ? "Frontend Technologies"
                          : category === "backend"
                          ? "Backend Technologies"
                          : "Programming & Tools"}
                      </h3>

                      {skills.map((skill, index) => {
                        const globalIndex =
                          Object.keys(skillsData)
                            .slice(0, Object.keys(skillsData).indexOf(category))
                            .reduce(
                              (acc, key) => acc + skillsData[key].length,
                              0
                            ) + index;

                        return (
                          <div key={skill.name} className="skill-item-wrapper">
                            <div className="skill-item">
                              <div className="skill-icon">
                                <i
                                  className={skill.icon}
                                  style={{ color: skill.color }}
                                ></i>
                              </div>
                              <div className="skill-name">{skill.name}</div>
                              <div className="skill-percentage">
                                {skill.level}%
                              </div>
                            </div>
                            <div className="skill-level">
                              <div
                                className="skill-progress"
                                data-width={`${skill.level}%`}
                                ref={(el) =>
                                  (skillRefs.current[globalIndex] = el)
                                }
                                style={{ "--skill-color": skill.color }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
