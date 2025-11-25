import React, { useState, useEffect } from "react";
import "../style/Portfolio.css";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import api from "../Services/apiConfig.js";

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Show 3 items per page
  const [currentItems, setCurrentItems] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch projects from backend API
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fix image URL function - Same as in ViewProjects
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // Get your API URL from environment variables
    const apiUrl = import.meta.env.VITE_API_URL;

    // Remove /api/v1 to get the base domain
    const baseUrl = apiUrl.replace("/api/v1", "");

    // For paths starting with /uploads
    if (imagePath.startsWith("/uploads")) {
      return `${baseUrl}${imagePath}`;
    }

    // For relative paths without /uploads
    return `${baseUrl}/uploads/${imagePath}`;
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/project/getProjects");

      if (response.data.success) {
        const projects = response.data.projects || [];

        // Transform the API data to match the component structure
        const transformedProjects = projects.map((project) => ({
          id: project._id,
          image: getImageUrl(project.image), // Use the function here
          alt: project.title,
          title: project.title,
          description: project.description,
          tags: project.tags || [],
          status: project.status,
          liveDemo: project.liveLink || "#",
          github: project.githubLink || "#",
        }));

        setPortfolioItems(transformedProjects);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  // Update current items when page changes
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(portfolioItems.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage, portfolioItems]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle image error - fallback to placeholder
  const handleImageError = (e) => {
    e.target.src =
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="portfolio-content">
          <div className="portfolio-container">
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading projects...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="portfolio-content">
          <div className="portfolio-container">
            <div className="error-container">
              <i className="fas fa-exclamation-triangle"></i>
              <h3>Error Loading Portfolio</h3>
              <p>{error}</p>
              <button onClick={fetchProjects} className="btn-retry">
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="portfolio-content">
        <div className="portfolio-container">
          <h1 className="portfolio-title">My Portfolio</h1>
          <p className="portfolio-description">
            A collection of my recent projects and work. Each project represents
            a unique challenge and solution.
          </p>

          {portfolioItems.length === 0 ? (
            <div className="no-projects">
              <i className="fas fa-folder-open"></i>
              <h3>No Projects Yet</h3>
              <p>Check back soon for new projects!</p>
            </div>
          ) : (
            <>
              <div className="portfolio-grid" id="portfolioGrid">
                {currentItems.map((item) => (
                  <div key={item.id} className="portfolio-item">
                    <div className="portfolio-img">
                      <img
                        src={item.image}
                        alt={item.alt}
                        onError={handleImageError}
                      />
                      {/* Show project status badge */}
                      <div className="project-status-badge">
                        <span
                          className={`status-${
                            item.status?.replace("-", "") || "completed"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                    <div className="portfolio-info">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <div className="portfolio-tags">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="portfolio-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="portfolio-links">
                        {item.liveDemo !== "#" && (
                          <a
                            href={item.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-link"
                            title="Live Demo"
                          >
                            <i className="fas fa-external-link-alt"></i>
                            Live Demo
                          </a>
                        )}
                        {item.github !== "#" && (
                          <a
                            href={item.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="portfolio-link"
                            title="View Code"
                          >
                            <i className="fab fa-github"></i>
                            GitHub
                          </a>
                        )}
                        {item.liveDemo === "#" && item.github === "#" && (
                          <span className="no-links">No links available</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination" id="pagination">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`page-btn ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    &laquo;
                  </button>

                  {/* Page Numbers */}
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`page-btn ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`page-btn ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Portfolio;
