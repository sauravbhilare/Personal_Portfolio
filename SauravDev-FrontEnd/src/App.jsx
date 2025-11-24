import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/store.js";
import Home from "./Pages/Home.jsx";
import About from "./Pages/About.jsx";
import Resume from "./Pages/Resume.jsx";
import Portfolio from "./Pages/Portfolio.jsx";
import Contact from "./Pages/Contact.jsx";
import Login from "./Pages/Login.jsx";
import Registeration from "./Pages/Registration.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import axios from "axios";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  async function getUserData() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/loggedInUser",
        { withCredentials: true }
      );
      console.log("user data", response.data);
      if (response.data.success) {
        dispatch(login(response.data.user));
      }
    } catch (error) {
      console.log("error fetching user data", error);
    }
  }

  useEffect(() => {
    if (user) {
    } else {
      getUserData();
    }
  }, [user]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registeration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
