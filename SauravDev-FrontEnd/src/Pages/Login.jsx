import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../style/Login.css";
import { login } from "../../Redux/store";
import api from "../Services/apiConfig.js";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (loginError) {
      setLoginError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await api.post("/auth/login", formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(login(response.data.user));
        alert(response.data.message);

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        navigate("/dashboard");
      } else {
        setLoginError(response.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Illustration */}
        <div className="login-left">
          <div className="login-illustration">
            <div className="illustration-container">
              <div className="welcome-text">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue your journey with us</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-form-container">
            {/* Back to Home Button */}
            <button
              type="button"
              className="back-to-home-btn"
              onClick={handleBackToHome}
              disabled={isLoading}
            >
              <i className="fas fa-arrow-left"></i>
              Back To Home
            </button>

            <div className="form-header">
              <h1>Sign In</h1>
              <p>Enter your credentials to access your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {loginError && (
                <div className="error-message general-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {loginError}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-triangle"></i>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-triangle"></i>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </>
                )}
              </button>

              <div className="signup-link">
                <p>
                  Don't have an account?{" "}
                  <Link to="/register" className="link">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
