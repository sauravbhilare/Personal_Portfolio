import Project from "../Models/project.schema.js";

const GetDashboardStats = async (req, res) => {
  try {
    // Get all projects
    const projects = await Project.find().sort({ createdAt: -1 });

    // Calculate statistics
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "completed").length;
    const inProgress = projects.filter(
      (p) => p.status === "in-progress"
    ).length;
    const planning = projects.filter((p) => p.status === "planning").length;

    // Calculate progress statistics
    const totalProgress = projects.reduce(
      (sum, project) => sum + (project.progress || 0),
      0
    );
    const averageProgress = total > 0 ? Math.round(totalProgress / total) : 0;

    // Calculate upcoming deadlines (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeadlines = projects.filter((project) => {
      if (!project.dueDate) return false;
      const dueDate = new Date(project.dueDate);
      return dueDate > today && dueDate <= nextWeek;
    }).length;

    // Get projects by category
    const projectsByCategory = projects.reduce((acc, project) => {
      const category = project.category || "other";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Recent projects (last 5)
    const recentProjects = projects.slice(0, 5).map((project) => ({
      _id: project._id,
      title: project.title,
      status: project.status,
      progress: project.progress,
      category: project.category,
      createdAt: project.createdAt,
    }));

    res.status(200).json({
      success: true,
      stats: {
        total,
        completed,
        inProgress,
        planning,
        averageProgress,
        upcomingDeadlines,
        projectsByCategory,
      },
      recentProjects,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      message: "Server error while fetching dashboard statistics",
      success: false,
      error: error.message,
    });
  }
};

export { GetDashboardStats };
