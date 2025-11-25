import Project from "../Models/project.schema.js";

const CreateProject = async (req, res) => {
  try {
    const { title, description, tags, liveLink, githubLink, category, status } =
      req.body;

    // Process tags
    const processedTags = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());

    // Calculate progress based on status
    let progress = 0;
    if (status === "completed") progress = 100;
    else if (status === "in-progress") progress = 50;

    // Handle image URL - USING ENV VARIABLE
    let imageUrl = "";
    if (req.file) {
      imageUrl = `${process.env.CLIENT_URL}/uploads/${req.file.filename}`;
    }

    const newProject = new Project({
      title,
      description,
      tags: processedTags,
      liveLink,
      githubLink,
      category,
      status,
      progress,
      image: imageUrl,
    });

    await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      message: "Server error while creating project",
      success: false,
      error: error.message,
    });
  }
};

const GetProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    // Ensure all projects have full image URLs
    const projectsWithFullUrls = projects.map((project) => {
      if (project.image && !project.image.startsWith("http")) {
        // Convert relative paths to full URLs
        return {
          ...project._doc,
          image: `${process.env.CLIENT_URL}${project.image}`,
        };
      }
      return project;
    });

    res.status(200).json({
      message: "Projects fetched successfully",
      success: true,
      projects: projectsWithFullUrls,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      message: "Server error while fetching projects",
      success: false,
      error: error.message,
    });
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

    // Handle image update if new image is provided - USING ENV VARIABLE
    if (req.file) {
      project.image = `${process.env.CLIENT_URL}/uploads/${req.file.filename}`;
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
