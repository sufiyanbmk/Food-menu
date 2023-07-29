import { Request, Response } from "express";
import {
  getAllUsers,
  changeToAdmin,
  getCatagory,
  createCatagory,
  gettingEmailFromToken,
  createMenu,
  editMenu,
} from "../helper/adminHelper";
import AppError from "../utils/appError";
import { HttpStatus } from "../types/httpStatus";
import { MenuInterface } from "../types/menuInterface";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const giveAdministriveToUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await changeToAdmin(id);
  res.json({ status: "success", message: "user has become admin" });
};

export const addCatagory = async (req: Request, res: Response) => {
  const { name, parent } = req.body;
  if (!name) {
    throw new AppError("add catagory name", HttpStatus.BAD_REQUEST);
  }
  const existingCatagory = await getCatagory(name);
  if (existingCatagory) {
    throw new AppError("already exist", HttpStatus.CONFLICT);
  }
  if (parent) {
    const parentExist = await getCatagory(parent);
    if (!parentExist) {
      throw new AppError("Super catagory is not exist", HttpStatus.BAD_REQUEST);
    }
  }
  await createCatagory({ name, parent });
  res.json({ status: "success" });
};

export const addMenuIteam = async (req: Request, res: Response) => {
  const { email } = await gettingEmailFromToken(req);
  const menuData: MenuInterface = req.body;
  const files = req.files as Express.Multer.File[];
  await createMenu(email, menuData, files);
  res.json({ status: "success", message: "Meun added" });
};

export const updateMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = await gettingEmailFromToken(req);
  const editedData: MenuInterface = req.body;
  const files = req.files as Express.Multer.File[];
  await editMenu(id, email, editedData, files);
  res.json({ status: "success", message: "Edited successfully" });
};
