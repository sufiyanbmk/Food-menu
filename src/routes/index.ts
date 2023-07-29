import { Application } from "express";
import authRouter from "./authRoutes";
import adminRouter from "./adminRoutes";
import userRouter from "./userRoutes";

const routes = (app: Application) => {
  app.use("/api/auth", authRouter());
  app.use("/api/admin", adminRouter());
  app.use("/api/user", userRouter());
};

export default routes;
