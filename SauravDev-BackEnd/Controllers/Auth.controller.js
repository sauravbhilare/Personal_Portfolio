import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.schema.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", success: false });
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    // Store cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send user info
    const responseUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      email: user.email,
    };

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: responseUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const Register = async (req, res) => {
  const { firstName, lastName, email, password, profile } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profile: "",
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const UpdateUserProfile = async (req, res) => {
  try {
    // Get user ID from URL parameters instead of token
    const userId = req.params.userId;

    // Optional: Add security check to ensure user can only update their own profile
    if (userId !== req.userId) {
      return res.status(403).json({
        message: "Forbidden: You can only update your own profile",
        success: false,
      });
    }

    const { firstName, lastName, email, password, profile } = req.body;

    // Build update object
    const updateData = {
      firstName,
      lastName,
      email,
      profile,
    };

    // Only update password if provided
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password"); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      user: updatedUser,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("UpdateUserProfile error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const GetLoggedInUser = async (req, res) => {
  try {
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided", success: false });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("GetLoggedInUser error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ message: "Logout successful", success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export { Login, Register, GetLoggedInUser, UpdateUserProfile, Logout };
