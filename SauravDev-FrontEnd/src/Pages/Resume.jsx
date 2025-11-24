import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../style/Resume.css";
import Resumefile from "../assets/SauravBhilare-Resume.pdf";

const Resume = () => {
  const downloadResume = () => {
    try {
      const link = document.createElement("a");
      link.href = Resumefile;
      link.download = "SauravBhilare-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);

      window.open(Resume, "_blank");
    }
  };

  return (
    <>
      <Navbar />
      <div className="resume-content">
        <div className="resume-container">
          <h1 className="resume-title"> My Resume</h1>
          <p className="resume-description">
            A detailed overview of my education, experience, and technical
            skills
          </p>
          <div className="btn-container">
            <a className="download-btn" onClick={downloadResume}>
              <i className="fas fa-download"></i> Download Resume
            </a>
          </div>
          <div className="resume-section">
            <h2 className="section-title">Education</h2>
            <div className="resume-row">
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Bachelor of Technology (B.Tech)</h3>
                  <h4>ISBM University</h4>
                  <span className="resume-date">2021 - 2024</span>
                  <p>
                    Completed my graduation in Computer Science with a focus on
                    software development and web technologies.
                  </p>
                  <p>
                    <strong>CGPA:</strong> 6.6/10
                  </p>
                </div>
              </div>
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Diploma in Computer Engineering</h3>
                  <h4>Maharashtra State Board Of Technical Education</h4>
                  <span className="resume-date">2019 - 2021</span>
                  <p>
                    Completed Diploma grade with specialization in Computer
                    Engineering
                  </p>
                  <p>
                    <strong>Percentage:</strong> 78%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="section-title">Experience</h2>
            <div className="resume-row">
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Junior Developer</h3>
                  <h4>Masys Tech Solution Pvt. Ltd.</h4>
                  <span className="resume-date">July 2023 - November 2024</span>
                  <ul>
                    <li>
                      Developed and maintained web applications using C#, .NET,
                      and SQL Server
                    </li>
                    <li>
                      Collaborated with team members to implement new features
                      and fix bugs
                    </li>
                    <li>
                      Participated in code reviews and contributed to improving
                      code quality
                    </li>
                    <li>
                      Worked on both front-end and back-end development tasks
                    </li>
                  </ul>
                </div>
              </div>
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Intern</h3>
                  <h4>Masys Tech Solution Pvt. Ltd.</h4>
                  <span className="resume-date">Jan 2023 - Jun 2023</span>
                  <ul>
                    <li>
                      Learned and applied web development technologies including
                      HTML, CSS, JavaScript, and .NET
                    </li>
                    <li>
                      Assisted senior developers in building and testing
                      applications
                    </li>
                    <li>
                      Gained hands-on experience with real-world projects and
                      development workflows
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="section-title">Skills</h2>
            <div className="resume-row">
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Technical Skills</h3>
                  <div className="skills-list">
                    <span className="skill-tag">HTML5</span>
                    <span className="skill-tag">CSS3</span>
                    <span className="skill-tag">JavaScript</span>
                    <span className="skill-tag">C#</span>
                    <span className="skill-tag">.NET</span>
                    <span className="skill-tag">SQL</span>
                    <span className="skill-tag">Git</span>
                    <span className="skill-tag">GitHub</span>
                    <span className="skill-tag">React.js</span>
                    <span className="skill-tag">Bootstrap</span>
                    <span className="skill-tag">Tailwind CSS</span>
                    <span className="skill-tag">Node js</span>
                    <span className="skill-tag">Express js</span>
                    <span className="skill-tag">MongoDB</span>
                  </div>
                </div>
              </div>
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Professional Skills</h3>
                  <div className="skills-list">
                    <span className="skill-tag">Problem Solving</span>
                    <span className="skill-tag">Team Collaboration</span>
                    <span className="skill-tag">Communication</span>
                    <span className="skill-tag">Time Management</span>
                    <span className="skill-tag">Adaptability</span>
                    <span className="skill-tag">Attention to Detail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="resume-section">
            <h2 className="section-title">Certifications</h2>
            <div className="resume-row">
              <div className="resume-col">
                <div className="resume-item">
                  <h3>MERN Stack Development</h3>
                  <h4>Awdiz Institute (In Progress)</h4>
                  <span className="resume-date">2025</span>
                  <p>
                    Comprehensive course covering MongoDB, Express.js, React.js,
                    and Node.js
                  </p>
                </div>
              </div>
              <div className="resume-col">
                <div className="resume-item">
                  <h3>Web Development</h3>
                  <h4>Masys Tech Solution Pvt. Ltd.</h4>
                  <span className="resume-date">2023</span>
                  <p>
                    Comprehensive course covering HTML, CSS, JavaScript, and
                    .NET
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resume;
