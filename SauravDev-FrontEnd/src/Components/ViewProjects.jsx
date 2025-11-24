import React, { useState, useEffect } from "react";
import "../style/ViewProjects.css";
import axios from "axios";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/project/getProjects"
      );

      if (response.data.success) {
        setProjects(response.data.projects || []);
      } else {
        setError("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fix image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://via.placeholder.com/400x200/2a9d8f/ffffff?text=Project+Image";
    }

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    if (imagePath.startsWith("/uploads")) {
      return `http://localhost:8000${imagePath}`;
    }

    return imagePath;
  };

  // Handle project update
  const handleUpdateProject = async (updatedProject) => {
    try {
      setActionLoading("update");
      const formData = new FormData();

      // Append all fields
      formData.append("title", updatedProject.title);
      formData.append("description", updatedProject.description);
      formData.append(
        "tags",
        Array.isArray(updatedProject.tags)
          ? updatedProject.tags.join(",")
          : updatedProject.tags
      );
      formData.append("liveLink", updatedProject.liveLink || "");
      formData.append("githubLink", updatedProject.githubLink || "");
      formData.append("category", updatedProject.category);
      formData.append("status", updatedProject.status);

      // Append new image if selected
      if (editImage) {
        formData.append("image", editImage);
      }

      const response = await axios.put(
        `http://localhost:8000/api/v1/project/updateProject/${editingProject}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Project updated successfully!");
        setEditingProject(null);
        setEditForm({});
        setEditImage(null);
        setImagePreview(null);
        fetchProjects(); // Refresh the list
      } else {
        alert("Error updating project: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Handle project delete
  const handleDeleteProject = async (projectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      )
    ) {
      try {
        setActionLoading("delete");
        const response = await axios.delete(
          `http://localhost:8000/api/v1/project/deleteProject/${projectId}`
        );

        if (response.data.success) {
          alert("Project deleted successfully!");
          fetchProjects(); // Refresh the list
        } else {
          alert("Error deleting project: " + response.data.message);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      } finally {
        setActionLoading(null);
      }
    }
  };

  // Handle edit start
  const handleEdit = (project) => {
    setEditingProject(project._id);
    setEditForm({
      ...project,
      tags: Array.isArray(project.tags)
        ? project.tags.join(", ")
        : project.tags,
    });
    setImagePreview(getImageUrl(project.image)); // Set current image as preview
    setEditImage(null);
  };

  // Handle edit image change
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle remove image
  const handleRemoveImage = () => {
    setEditImage(null);
    setImagePreview(null);
    // Keep the original image in editForm but we'll handle this in the update
  };

  // Handle save edit
  const handleSave = () => {
    handleUpdateProject(editForm);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingProject(null);
    setEditForm({});
    setEditImage(null);
    setImagePreview(null);
  };

  // Filter projects based on search and filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (project.tags &&
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    const matchesFilter = filter === "all" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

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

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "fas fa-check-circle";
      case "in-progress":
        return "fas fa-spinner";
      case "planning":
        return "fas fa-clipboard-list";
      default:
        return "fas fa-question-circle";
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="view-projects">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-projects">
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error Loading Projects</h3>
          <p>{error}</p>
          <button onClick={fetchProjects} className="btn-retry">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="view-projects">
      <div className="view-projects-header">
        <div>
          <h1>My Projects</h1>
          <p>Manage and view all your created projects</p>
        </div>
        <div className="projects-count">
          <span className="count">{filteredProjects.length}</span>
          <span>Projects</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="projects-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search projects by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "planning" ? "active" : ""}`}
            onClick={() => setFilter("planning")}
          >
            Planning
          </button>
          <button
            className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <i className="fas fa-folder-open"></i>
            <h3>No projects found</h3>
            <p>
              {projects.length === 0
                ? "Create your first project to get started!"
                : "No projects match your search criteria."}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              {/* Project Image */}
              <div className="project-image">
                <img
                  src={getImageUrl(project.image)}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x200/2a9d8f/ffffff?text=Project+Image";
                  }}
                />
                <div className="project-actions">
                  <button
                    className="action-btn edit"
                    onClick={() => handleEdit(project)}
                    disabled={actionLoading}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteProject(project._id)}
                    disabled={actionLoading}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="project-content">
                {editingProject === project._id ? (
                  <div className="edit-form">
                    <div className="form-group">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        value={editForm.title || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="edit-input"
                        placeholder="Project Title"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Project Description *</label>
                      <textarea
                        value={editForm.description || ""}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        className="edit-textarea"
                        rows="3"
                        placeholder="Project Description"
                        required
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="form-group">
                      <label>Project Image</label>
                      <div className="image-upload-edit">
                        <div className="current-image-preview">
                          {imagePreview && (
                            <div className="image-preview-container">
                              <img
                                src={imagePreview}
                                alt="Current project"
                                className="image-preview-edit"
                              />
                              <span className="current-image-label">
                                Current Image
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="image-upload-controls">
                          <input
                            type="file"
                            id={`image-upload-${project._id}`}
                            accept="image/*"
                            onChange={handleEditImageChange}
                            className="image-input-edit"
                          />
                          <label
                            htmlFor={`image-upload-${project._id}`}
                            className="image-upload-btn"
                          >
                            <i className="fas fa-cloud-upload-alt"></i>
                            {editImage ? "Change Image" : "Upload New Image"}
                          </label>

                          {imagePreview && (
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={handleRemoveImage}
                            >
                              <i className="fas fa-times"></i>
                              Remove Image
                            </button>
                          )}
                        </div>

                        {editImage && (
                          <div className="new-image-preview">
                            <img
                              src={URL.createObjectURL(editImage)}
                              alt="New upload preview"
                              className="new-image-preview-img"
                            />
                            <span className="new-image-label">
                              New Image Preview
                            </span>
                          </div>
                        )}
                      </div>
                      <small>
                        Select a new image to replace the current one
                      </small>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Technologies & Tags</label>
                        <input
                          type="text"
                          value={editForm.tags || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              tags: e.target.value,
                            }))
                          }
                          className="edit-input"
                          placeholder="React, Node.js, MongoDB"
                        />
                        <small>Separate tags with commas</small>
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        <select
                          value={editForm.category || "web"}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="edit-select"
                        >
                          <option value="web">Web Development</option>
                          <option value="mobile">Mobile App</option>
                          <option value="desktop">Desktop Application</option>
                          <option value="api">API Development</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Live Demo Link</label>
                        <input
                          type="url"
                          value={editForm.liveLink || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              liveLink: e.target.value,
                            }))
                          }
                          className="edit-input"
                          placeholder="https://your-project.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>GitHub Repository</label>
                        <input
                          type="url"
                          value={editForm.githubLink || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              githubLink: e.target.value,
                            }))
                          }
                          className="edit-input"
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Project Status</label>
                      <select
                        value={editForm.status || "planning"}
                        onChange={(e) =>
                          setEditForm((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="edit-select"
                      >
                        <option value="planning">Planning</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="edit-actions">
                      <button
                        className="btn-save"
                        onClick={handleSave}
                        disabled={actionLoading === "update"}
                      >
                        {actionLoading === "update" ? (
                          <>
                            <div className="spinner-small"></div>
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={handleCancel}
                        disabled={actionLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="project-header">
                      <h3 className="project-title">{project.title}</h3>
                      <span
                        className="project-status"
                        style={{ color: getStatusColor(project.status) }}
                      >
                        <i className={getStatusIcon(project.status)}></i>
                        {project.status
                          ? project.status.replace("-", " ")
                          : "Unknown"}
                      </span>
                    </div>

                    <p className="project-description">{project.description}</p>

                    {project.tags && project.tags.length > 0 && (
                      <div className="project-tags">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="project-links">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          Live Demo
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          <i className="fab fa-github"></i>
                          GitHub
                        </a>
                      )}
                    </div>

                    <div className="project-footer">
                      <div className="project-meta">
                        <span className="meta-item">
                          <i className="fas fa-calendar"></i>
                          {formatDate(project.createdAt)}
                        </span>
                        <span className="meta-item">
                          <i className="fas fa-code"></i>
                          {project.category || "web"}
                        </span>
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
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewProjects;
