import { Router } from "express";
import authRouter from "./Auth.route.js";
import ProjectRouter from "./Project.route.js";
import DashboardRouter from "./Dashboard.route.js";

const MainRouter = Router();

MainRouter.use("/auth", authRouter);
MainRouter.use("/project", ProjectRouter);
MainRouter.use("/dashboard", DashboardRouter);

export default MainRouter;
