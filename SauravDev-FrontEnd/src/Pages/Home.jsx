import React from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import "../style/Home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="content">
        <div className="hero-container">
          <h1 className="name">Saurav Bhilare </h1>
          <p className="role">Fullstack Web Developer From Mumbai</p>
          <button className="about-btn">About Me</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
