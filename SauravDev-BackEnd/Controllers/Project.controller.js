import Project from "../Models/project.schema.js";

const CreateProject = async (req, res) => {
  try {
    const { title, description, tags, liveLink, githubLink, category, status } =
      req.body;

    console.log("Received data:", req.body);
    console.log("Received file:", req.file);

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
        success: false,
      });
    }

    // Handle file validation error from multer
    if (req.fileValidationError) {
      return res.status(400).json({
        message: req.fileValidationError,
        success: false,
      });
    }

    let progress =
      status === "completed" ? 100 : status === "in-progress" ? 50 : 0;

    const processedTags = tags ? tags.split(",").map((t) => t.trim()) : [];

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : "https://via.placeholder.com/400x200/2a9d8f/ffffff?text=Project+Image";

    const project = new Project({
      title,
      description,
      image: imageUrl,
      tags: processedTags,
      liveLink: liveLink || "",
      githubLink: githubLink || "",
      category: category || "web",
      status: status || "planning",
      progress,
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects, success: true });
  } catch (error) {
    console.error("Error getting projects:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
const UpdateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, liveLink, githubLink, category, status } =
      req.body;

    // Find the project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    // Calculate progress based on status
    let progress = project.progress;
    if (status === "completed") {
      progress = 100;
    } else if (status === "in-progress") {
      progress = 50;
    } else if (status === "planning") {
      progress = 0;
    }

    // Process tags
    const processedTags = tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim())
      : [];

    // Update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.tags = processedTags;
    project.liveLink = liveLink || project.liveLink;
    project.githubLink = githubLink || project.githubLink;
    project.category = category || project.category;
    project.status = status || project.status;
    project.progress = progress;
    project.updatedAt = new Date();

    // Handle image update if new image is provided
    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    }

    await project.save();

    res.status(200).json({
      message: "Project updated successfully",
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      message: "Server error while updating project",
      success: false,
      error: error.message,
    });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      message: "Server error while deleting project",
      success: false,
      error: error.message,
    });
  }
};

export { CreateProject, GetProjects, UpdateProject, DeleteProject };
