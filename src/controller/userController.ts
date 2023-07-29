import { Request, Response } from "express";
import { updatIngDocs, getMenuIteams } from "../helper/userHelper";
import AppError from "../utils/appError";
import { HttpStatus } from "../types/httpStatus";
import CustomRequest from "../types/nameSpace";

export const editProfile = async (req: any, res: Response) => {
  const userID = req.userId;
  const user: {
    username: string;
    email: string;
    phone: number;
  } = req.body;

  const updatedData = await updatIngDocs(userID, user);
  if (updatedData?.username) {
    res.json({
      status: "success",
      message: "edited successfully",
      updatedData,
    });
  } else {
    throw new AppError("edited failed", HttpStatus.SERVICE_UNAVAILABLE);
  }
};

export const getAllMenuIteams = async (req: Request, res: Response) => {
  const menuIteams = await getMenuIteams();
  res.json(menuIteams);
};
