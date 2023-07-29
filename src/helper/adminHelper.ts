import { Request } from "express";
import User from "../models/user";
import { HttpStatus } from "../types/httpStatus";
import AppError from "../utils/appError";
import Catagory from "../models/catagory";
import { CatagoryType } from "../types/catagoryType";
import { verifyToken } from "./authHelper";
import { MenuInterface } from "../types/menuInterface";
import { uploadFile } from "./s3Helper";
import Menu from "../models/menu";
import mongoose from "mongoose";

export const getAllUsers = async () => {
  try {
    const userList = await User.find();
    return userList;
  } catch (err) {
    throw new AppError("database Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const changeToAdmin = async (id: string) => {
  try {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isAdmin: true,
        },
      }
    );
  } catch (err) {
    throw new AppError("database Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const getCatagory = async (attribute: string) => {
  try {
    const catagory = await Catagory.findOne({ attribute });
    return catagory;
  } catch (err) {
    throw new AppError("database Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const createCatagory = async (catagoryData: CatagoryType) => {
  try {
    await Catagory.create(catagoryData);
  } catch (err) {
    throw new AppError("database Error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const gettingEmailFromToken = async (req: Request) => {
  let token: string | null = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
  }
  try {
    const { payload }: any = verifyToken(token);
    return payload;
  } catch (err) {
    throw new AppError("UnAuthorized User", HttpStatus.UNAUTHORIZED);
  }
};

export const createMenu = async (
  email: string,
  data: MenuInterface,
  file: Express.Multer.File[] | undefined
) => {
  try {
    data.email = email;
    if (file) {
      data.file = await uploadFile(file[0]);
    }
    await Menu.create(data);
  } catch (err) {
    throw new AppError(
      "Error try again later",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const editMenu = async (
  id: string,
  email: string,
  data: MenuInterface,
  file: Express.Multer.File[] | undefined
) => {
  try {
    console.log(data);
    const menu = await Menu.findById(id);
    if (!menu) {
      throw new AppError("not found", HttpStatus.NOT_FOUND);
    }
    if (menu?.email !== email) {
      throw new AppError("Unauthorized Action", HttpStatus.UNAUTHORIZED);
    }

    //uploading image if there is no image then placing the old image becouse we don't send image.
    if (file) {
      data.file = await uploadFile(file[0]);
    } else {
      data.file = menu.file;
    }

    await Menu.updateOne({ _id: id }, data);
  } catch {
    throw new AppError(
      "Error try again later",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
