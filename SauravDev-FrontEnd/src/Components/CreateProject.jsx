import React, { useState } from "react";
import "../style/CreateProject.css";
import api from "../Services/apiConfig.js";

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
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
    }

    // Image validation (optional but if provided, validate)
    if (formData.image) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.image.size > maxSize) {
        newErrors.image = "Image size should be less than 5MB";
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
      if (!validTypes.includes(formData.image.type)) {
        newErrors.image = "Only JPG, PNG, and GIF images are allowed";
      }
    }

    // URL validation (optional fields)
    if (formData.liveLink && !isValidUrl(formData.liveLink)) {
      newErrors.liveLink = "Please enter a valid URL";
    }

    if (formData.githubLink && !isValidUrl(formData.githubLink)) {
      newErrors.githubLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate image before setting
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }));
        return;
      }

      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only JPG, PNG, and GIF images are allowed",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Clear image error
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setImagePreview(null);
    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("tags", formData.tags.trim());
      formDataToSend.append("liveLink", formData.liveLink.trim());
      formDataToSend.append("githubLink", formData.githubLink.trim());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("status", formData.status);

      // Append image file (only if selected)
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const res = await api.post("/project/createProject", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout
      });

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
        setErrors({});
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
      } else if (error.code === "ECONNABORTED") {
        alert("Request timeout: Please try again.");
      } else {
        // Something else happened
        alert("Error: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
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
    setErrors({});
  };

  return (
    <div className="create-project">
      <div className="create-project-header">
        <h1>Create New Project</h1>
        <p>Add your project details and showcase your work</p>
      </div>

      <form onSubmit={handleSubmit} className="project-form" noValidate>
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
                className={errors.title ? "error" : ""}
              />
              {errors.title && (
                <span className="error-message">{errors.title}</span>
              )}
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
              className={errors.description ? "error" : ""}
            ></textarea>
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
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
                  <div className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={handleRemoveImage}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Click to upload project image</span>
                    <small>Recommended: 800x400px • Max: 5MB</small>
                  </div>
                )}
              </label>
              {errors.image && (
                <span className="error-message">{errors.image}</span>
              )}
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
                className={errors.liveLink ? "error" : ""}
              />
              {errors.liveLink && (
                <span className="error-message">{errors.liveLink}</span>
              )}
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
                className={errors.githubLink ? "error" : ""}
              />
              {errors.githubLink && (
                <span className="error-message">{errors.githubLink}</span>
              )}
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
            onClick={handleClearForm}
            disabled={isLoading}
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
