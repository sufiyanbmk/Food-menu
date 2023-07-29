import { Request, Response } from "express";
import { body } from "express-validator";
import configKeys from "../config";
import { HttpStatus } from "../types/httpStatus";
import { getUserByEmail, createUser } from "../helper/userHelper";
import { generateToken, comparePassword } from "../helper/authHelper";
import AppError from "../utils/appError";
import { UserInterface, UserReturnInterface } from "../types/userInterface";
import User from "../models/user";

export const validateAdminSignin = [
  body("username").notEmpty().withMessage("Name is required"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export const adminSignin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let role = "super admin";
  let admin: Boolean | null =
    password === configKeys.ADMIN_PASSWORD && email === configKeys.ADMIN_EMAIL;
  if (!admin) {
    admin = await User.findOne({ email });
    role = "user admin";
  }

  if (admin) {
    // Generate JWT
    const token = generateToken({ email, role });

    res.json({
      status: "success",
      message: "admin verified",
      token,
    });
  } else {
    throw new AppError("invalid credentials", HttpStatus.UNAUTHORIZED);
  }
};

export const userSignup = async (req: Request, res: Response) => {
  const user: {
    username: string;
    email: string;
    phone: number;
    password: string;
  } = req.body;
  user.email = user.email.toLowerCase();
  let existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new AppError("existing email", HttpStatus.UNAUTHORIZED);
  }
  const userId = await createUser(user);
  // Generate JWT
  const token = generateToken(userId.toString());
  res.json({
    status: "success",
    message: "new user registered",
    token,
  });
};

export const userSignin = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  const userDetails = await getUserByEmail(email);
  if (!userDetails?._id) {
    throw new AppError("Not found", HttpStatus.NOT_FOUND);
  }
  const isPasswordCorrect = await comparePassword(
    userDetails.password,
    password
  );
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect password", HttpStatus.UNAUTHORIZED);
  }
  const token = generateToken(userDetails._id?.toString());
  const user: UserReturnInterface = {
    id: userDetails._id,
    email: userDetails.email,
    username: userDetails.username,
    isAdmin: userDetails.isAdmin,
    token: token,
  };
  res.json({
    status: "success",
    message: "user verified",
    user,
  });
};
