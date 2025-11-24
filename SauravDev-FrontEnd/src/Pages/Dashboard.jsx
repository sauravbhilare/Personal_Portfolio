import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashTopBar from "../Components/DashTopBar";
import VerticleMenu from "../Components/VerticleMenu";
import DashboardContent from "../Components/DashboardContent";
import CreateProject from "../Components/CreateProject";
import ViewProjects from "../Components/ViewProjects";

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo); // REDUX USER
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialProjects = [
    {
      id: 1,
      title: "E-Commerce Website",
      description: "A full-stack e-commerce platform with React and Node.js",
      category: "web",
      status: "in-progress",
      progress: 75,
      tags: ["React", "Node.js", "MongoDB"],
      liveLink: "https://demo-ecommerce.com",
      githubLink: "https://github.com/saurav/ecommerce",
      image:
        "https://via.placeholder.com/400x200/2a9d8f/ffffff?text=E-Commerce",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Personal portfolio website with modern design",
      category: "web",
      status: "completed",
      progress: 100,
      tags: ["React", "CSS3", "JavaScript"],
      liveLink: "https://saurav.dev",
      githubLink: "https://github.com/saurav/portfolio",
      image: "https://via.placeholder.com/400x200/264653/ffffff?text=Portfolio",
      createdAt: "2024-01-10",
    },
  ];

  // Fetch user profile data on component mount
  useEffect(() => {
    debugger;
    const fetchUserProfile = async () => {
      try {
        if (!user) {
          navigate("/login");
          return;
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // If API fails, user remains with initial Redux data
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();

    // Load projects safely
    const saved = localStorage.getItem("userProjects");
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(initialProjects);
      localStorage.setItem("userProjects", JSON.stringify(initialProjects));
    }
  }, [user, navigate]);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userProjects");
    navigate("/login");
  };

  const handleProfileUpdate = async (updatedUser) => {
    try {
      // Since we're not creating new payloads, we can refresh the page
      // or refetch the user data to update the Redux store
      window.location.reload(); // Simple solution to refresh user data
    } catch (error) {
      console.error("Error handling profile update:", error);
    }
  };

  const handleProjectCreated = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem("userProjects", JSON.stringify(updated));
  };

  const handleProjectUpdate = (updatedProject) => {
    const updated = projects.map((p) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    setProjects(updated);
    localStorage.setItem("userProjects", JSON.stringify(updated));
  };

  const handleProjectDelete = (projectId) => {
    const updated = projects.filter((p) => p.id !== projectId);
    setProjects(updated);
    localStorage.setItem("userProjects", JSON.stringify(updated));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardContent projects={projects} />;
      case "create-project":
        return <CreateProject onProjectCreated={handleProjectCreated} />;
      case "view-projects":
        return (
          <ViewProjects
            projects={projects}
            onProjectUpdate={handleProjectUpdate}
            onProjectDelete={handleProjectDelete}
          />
        );
      default:
        return <DashboardContent projects={projects} />;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <DashTopBar
        user={user}
        onLogout={handleLogout}
        onProfileUpdate={handleProfileUpdate}
      />
      <VerticleMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <main className="dashboard-main">{renderContent()}</main>
    </div>
  );
};

export default Dashboard;
