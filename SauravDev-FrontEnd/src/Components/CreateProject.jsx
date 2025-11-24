import React, { useState } from "react";
import "../style/CreateProject.css";
import axios from "axios";

const CreateProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    tags: "",
    liveLink: "",
    githubLink: "",
    category: "web",
    status: "planning",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("tags", formData.tags);
      formDataToSend.append("liveLink", formData.liveLink);
      formDataToSend.append("githubLink", formData.githubLink);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("status", formData.status);

      // Append image file (only if selected)
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/project/createProject",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Project created successfully!");

        // Reset form
        setFormData({
          title: "",
          image: null,
          description: "",
          tags: "",
          liveLink: "",
          githubLink: "",
          category: "web",
          status: "planning",
        });
        setImagePreview(null);
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response) {
        // Server responded with error status
        alert(
          `Error: ${error.response.data.message || "Something went wrong!"}`
        );
      } else if (error.request) {
        // Request was made but no response received
        alert("Network error: Please check your connection and try again.");
      } else {
        // Something else happened
        alert("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-project">
      <div className="create-project-header">
        <h1>Create New Project</h1>
        <p>Add your project details and showcase your work</p>
      </div>

      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile App</option>
                <option value="desktop">Desktop Application</option>
                <option value="api">API Development</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project, features, and technologies used..."
              rows="5"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-section">
          <h3>Project Image</h3>
          <div className="image-upload-section">
            <div className="image-upload">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              <label htmlFor="image" className="image-upload-label">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Click to upload project image</span>
                    <small>Recommended: 800x400px</small>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Project Links</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="liveLink">
                <i className="fas fa-external-link-alt"></i>
                Live Demo Link
              </label>
              <input
                type="url"
                id="liveLink"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleInputChange}
                placeholder="https://your-project.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubLink">
                <i className="fab fa-github"></i>
                GitHub Repository
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tags">Technologies & Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
              <small>Separate tags with commas</small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Project Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setFormData({
                title: "",
                image: null,
                description: "",
                tags: "",
                liveLink: "",
                githubLink: "",
                category: "web",
                status: "planning",
              });
              setImagePreview(null);
            }}
          >
            Clear Form
          </button>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Creating Project...
              </>
            ) : (
              <>
                <i className="fas fa-plus"></i>
                Create Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
