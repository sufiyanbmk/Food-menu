import express from "express";
import { editProfile, getAllMenuIteams } from "../controller/userController";
import userAuthMiddleware from "../middleware/userAuth";

const userRouter = () => {
  const router = express.Router();

  router.put("/edit-profile", userAuthMiddleware, editProfile);

  router.get("/menu-items", getAllMenuIteams);

  return router;
};

export default userRouter;
