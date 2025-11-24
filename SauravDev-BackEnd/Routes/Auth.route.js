import { Router } from "express";
import {
  Login,
  Register,
  GetLoggedInUser,
  UpdateUserProfile,
  Logout,
} from "../Controllers/Auth.controller.js";
import tokenDecoder from "../Middlewears/tokenMiddlewears.js";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/register", Register);
authRouter.get("/loggedInUser", tokenDecoder, GetLoggedInUser);
authRouter.put("/updateProfile/:userId", tokenDecoder, UpdateUserProfile);
authRouter.get("/logout", Logout);

export default authRouter;
