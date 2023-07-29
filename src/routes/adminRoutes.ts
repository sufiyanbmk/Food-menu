import express from "express";
import {
  getUsers,
  giveAdministriveToUser,
  addCatagory,
  addMenuIteam,
  updateMenuItem,
} from "../controller/adminController";
import roleAuthMiddleware from "../middleware/roleAuth";

import upload from "../middleware/upload";

const adminRouter = () => {
  const router = express.Router();

  router.get("/get-users", getUsers);

  router.patch(
    "/user-approval/:id",
    roleAuthMiddleware("super admin"),
    giveAdministriveToUser
  );

  router.post("/add-catagory", roleAuthMiddleware("super admin"), addCatagory);

  router.post("/add-menu", upload.single("file"), addMenuIteam);

  router.put("/edit-menu/:id", upload.single("file"), updateMenuItem);

  return router;
};

export default adminRouter;
