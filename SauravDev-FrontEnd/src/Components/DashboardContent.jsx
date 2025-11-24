import React, { useState, useEffect } from "react";
import "../style/DashboardContent.css";
import axios from "axios";

const DashboardContent = () => {
  const [projects, setProjects] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data from backend
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch projects
      const projectsResponse = await axios.get(
        "http://localhost:8000/api/v1/project/getProjects"
      );

      if (projectsResponse.data.success) {
        const projectsData = projectsResponse.data.projects || [];
        setProjects(projectsData);

        // Calculate stats from projects
        const stats = calculateStats(projectsData);
        setDashboardStats(stats);
      } else {
        setError("Failed to fetch projects data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from projects data
  const calculateStats = (projectsData) => {
    const total = projectsData.length;
    const completed = projectsData.filter(
      (p) => p.status === "completed"
    ).length;
    const inProgress = projectsData.filter(
      (p) => p.status === "in-progress"
    ).length;
    const planning = projectsData.filter((p) => p.status === "planning").length;

    // Calculate progress statistics
    const totalProgress = projectsData.reduce(
      (sum, project) => sum + (project.progress || 0),
      0
    );
    const averageProgress = total > 0 ? Math.round(totalProgress / total) : 0;

    // Find projects due soon (within next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = projectsData.filter((project) => {
      if (!project.dueDate) return false;
      const dueDate = new Date(project.dueDate);
      return dueDate > today && dueDate <= nextWeek;
    }).length;

    return {
      total,
      completed,
      inProgress,
      planning,
      averageProgress,
      upcomingDeadlines,
      totalProgress,
    };
  };

  const statCards = [
    {
      id: "total",
      title: "Total Projects",
      count: dashboardStats.total || 0,
      icon: "fas fa-folder-open",
      color: "#667eea",
      bgColor: "#667eea20",
    },
    {
      id: "in-progress",
      title: "In Progress",
      count: dashboardStats.inProgress || 0,
      icon: "fas fa-spinner",
      color: "#ffc107",
      bgColor: "#ffc10720",
    },
    {
      id: "completed",
      title: "Completed",
      count: dashboardStats.completed || 0,
      icon: "fas fa-check-circle",
      color: "#28a745",
      bgColor: "#28a74520",
    },
    {
      id: "planning",
      title: "Planning",
      count: dashboardStats.planning || 0,
      icon: "fas fa-clipboard-list",
      color: "#17a2b8",
      bgColor: "#17a2b820",
    },
  ];

  const recentProjects = projects.slice(0, 3);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#28a745";
      case "in-progress":
        return "#ffc107";
      case "planning":
        return "#17a2b8";
      default:
        return "#6c757d";
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-content">
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="btn-retry">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Welcome to Your Dashboard</h1>
        <p>Here's an overview of your projects and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div
              className="stat-icon"
              style={{
                backgroundColor: stat.bgColor,
                color: stat.color,
              }}
            >
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.count}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="recent-projects-section">
        <div className="section-header">
          <h2>Recent Projects</h2>
          <span className="view-all">View All</span>
        </div>

        {recentProjects.length === 0 ? (
          <div className="no-projects">
            <i className="fas fa-folder-open"></i>
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        ) : (
          <div className="projects-list">
            {recentProjects.map((project) => (
              <div key={project._id} className="project-item">
                <div className="project-header">
                  <h4 className="project-title">
                    {project.title || "Untitled Project"}
                  </h4>
                  <span
                    className="status-badge"
                    style={{ color: getStatusColor(project.status) }}
                  >
                    <i
                      className={`fas ${
                        project.status === "completed"
                          ? "fa-check-circle"
                          : project.status === "in-progress"
                          ? "fa-spinner"
                          : "fa-clipboard-list"
                      }`}
                    ></i>
                    {(project.status || "planning").replace("-", " ")}
                  </span>
                </div>

                <p className="project-description">
                  {project.description || "No description available"}
                </p>

                <div className="project-footer">
                  <div className="project-tech">
                    {(project.tags || []).slice(0, 3).map((tag, i) => (
                      <span key={i} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                    {(!project.tags || project.tags.length === 0) && (
                      <span className="tech-tag">No tags</span>
                    )}
                  </div>

                  <div className="project-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                    <span>{project.progress || 0}%</span>
                  </div>
                </div>

                <div className="project-meta">
                  <span className="meta-item">
                    <i className="fas fa-calendar"></i>
                    Created: {formatDate(project.createdAt)}
                  </span>
                  <span className="meta-item">
                    <i className="fas fa-code"></i>
                    {project.category || "web"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-item">
          <i className="fas fa-calendar-check" style={{ color: "#e74c3c" }}></i>
          <div>
            <h4>Upcoming Deadlines</h4>
            <p>{dashboardStats.upcomingDeadlines || 0} projects due soon</p>
          </div>
        </div>
        <div className="stat-item">
          <i className="fas fa-chart-line" style={{ color: "#2a9d8f" }}></i>
          <div>
            <h4>Average Progress</h4>
            <p>{dashboardStats.averageProgress || 0}% completed</p>
          </div>
        </div>
        <div className="stat-item">
          <i className="fas fa-tasks" style={{ color: "#667eea" }}></i>
          <div>
            <h4>Active Projects</h4>
            <p>{dashboardStats.inProgress || 0} in development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
