import React, { useState } from "react";
import "../style/DashTopBar.css";
import axios from "axios";
import { logout } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const DashTopBar = ({ onProfileUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    password: "",
    profile: user?.profile || "",
  });

  const handleProfileClick = () => {
    setShowProfileModal(true);
    setShowDropdown(false);
    // Initialize form with current user data from Redux
    setEditForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: "", // Always start with empty password for security
      profile: user?.profile || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const profileData = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        profile: editForm.profile,
      };

      // Only include password if it's not empty
      if (editForm.password && editForm.password.trim() !== "") {
        profileData.password = editForm.password;
      }

      // Get user ID from the user object (from Redux)
      const userId = user?.userId || user?._id;

      if (!userId) {
        throw new Error("User ID not found. Please log in again.");
      }

      // Use PUT request with the correct endpoint and user ID
      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/updateProfile/${userId}`,
        profileData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        onProfileUpdate(response.data.user);
        setShowProfileModal(false);
        // Clear password field for security
        setEditForm((prev) => ({ ...prev, password: "" }));
        alert("Profile updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      // Show more detailed error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error updating profile. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLinkChange = (e) => {
    const imageUrl = e.target.value;
    setEditForm((prev) => ({
      ...prev,
      profile: imageUrl,
    }));
  };

  const getFullName = () => {
    return `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  };

  // Only return image URL if it exists and is not empty
  const getDisplayAvatar = () => {
    const userAvatar = user?.profile;
    return userAvatar && userAvatar.trim() !== "" ? userAvatar : null;
  };

  const getAvatarUrl = () => {
    const formAvatar = editForm.profile;
    const userAvatar = user?.profile;

    // Use form value if available, otherwise user value
    const avatarUrl =
      formAvatar && formAvatar.trim() !== "" ? formAvatar : userAvatar;

    return avatarUrl && avatarUrl.trim() !== "" ? avatarUrl : null;
  };

  // Handle image errors by hiding the image
  const handleImageError = (e) => {
    console.warn("Profile image failed to load, hiding image");
    e.target.style.display = "none";
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/logout",
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch(logout());
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <div className="dash-topbar">
        <div className="topbar-left">
          <div className="logo">
            <i className="fas fa-code"></i>
            <span>SAURAV.DEV</span>
          </div>
        </div>

        <div className="topbar-right">
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          <div
            className="user-menu"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="user-info">
              {/* Only show image if available */}
              {getDisplayAvatar() ? (
                <img
                  src={getDisplayAvatar()}
                  alt={getFullName()}
                  className="user-avatar"
                  onError={handleImageError}
                />
              ) : (
                <div className="user-avatar-placeholder">
                  <i className="fas fa-user"></i>
                </div>
              )}
              <div className="user-details">
                <span className="user-name">{getFullName()}</span>
                <span className="user-role">{user?.role || "Developer"}</span>
              </div>
              <i
                className={`fas fa-chevron-down ${
                  showDropdown ? "rotate" : ""
                }`}
              ></i>
            </div>

            {showDropdown && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleProfileClick}>
                  <i className="fas fa-user-edit"></i>
                  Edit Profile
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="modal-overlay">
          <div className="profile-modal">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button
                className="close-btn"
                onClick={() => setShowProfileModal(false)}
                disabled={isLoading}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="profile-form">
              {/* Profile Image URL Section */}
              <div className="profile-image-section">
                <div className="current-image-preview">
                  <h3>Profile Image</h3>
                  <div className="image-preview-container">
                    {/* Only show preview if image URL exists */}
                    {getAvatarUrl() ? (
                      <img
                        src={getAvatarUrl()}
                        alt="Profile Preview"
                        className="profile-avatar-preview"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="profile-avatar-placeholder">
                        <i className="fas fa-user"></i>
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="image-preview-info">
                      <p>
                        {getAvatarUrl()
                          ? "Current profile image preview"
                          : "No profile image set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="image-url-input">
                  <label htmlFor="profileImageUrl">Profile Image URL</label>
                  <input
                    type="url"
                    id="profileImageUrl"
                    name="profile"
                    value={editForm.profile}
                    onChange={handleImageLinkChange}
                    placeholder="https://example.com/your-profile-image.jpg"
                    disabled={isLoading}
                  />
                  <small className="help-text">
                    Enter a direct link to your profile image. Leave empty to
                    remove image.
                  </small>
                </div>

                <div className="clear-image-section">
                  <button
                    type="button"
                    className="btn-clear-image"
                    onClick={() =>
                      setEditForm((prev) => ({
                        ...prev,
                        profile: "",
                      }))
                    }
                    disabled={isLoading}
                  >
                    <i className="fas fa-times"></i>
                    Remove Profile Image
                  </button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password (leave blank to keep current)"
                    disabled={isLoading}
                  />
                  <small className="help-text">
                    Leave blank if you don't want to change password
                  </small>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowProfileModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-save" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="spinner"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashTopBar;
