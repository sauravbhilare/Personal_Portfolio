import { Router } from "express";
import { GetDashboardStats } from "../Controllers/Dashboard.controller.js";

const DashboardRouter = Router();

DashboardRouter.get("/stats", GetDashboardStats);

export default DashboardRouter;
