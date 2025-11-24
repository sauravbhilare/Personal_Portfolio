import { Router } from "express";
import {
  CreateProject,
  GetProjects,
  UpdateProject,
  DeleteProject,
} from "../Controllers/Project.controller.js";
import { upload } from "../Middlewears/upload.js";

const ProjectRouter = Router();

ProjectRouter.post("/createProject", upload.single("image"), CreateProject);
ProjectRouter.get("/getProjects", GetProjects);
ProjectRouter.put("/updateProject/:id", upload.single("image"), UpdateProject);
ProjectRouter.delete("/deleteProject/:id", DeleteProject);

export default ProjectRouter;
