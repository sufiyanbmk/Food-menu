import express from "express";
import {
  validateAdminSignin,
  adminSignin,
  userSignin,
  userSignup,
} from "../controller/authController";

const authRouter = () => {
  const router = express.Router();

  router.post("/admin-signin", validateAdminSignin, adminSignin);

  router.post("/user-signup", userSignup);

  router.post("/user-signin", userSignin);

  return router;
};

export default authRouter;
