import Menu from "../models/menu";
import User from "../models/user";
import { HttpStatus } from "../types/httpStatus";
import { UpdateUser, UserInterface } from "../types/userInterface";
import AppError from "../utils/appError";

export const getUserByEmail = async (email: string) => {
  const user: UserInterface | null = await User.findOne({ email });
  return user;
};

export const createUser = async (user: UserInterface) => {
  try {
    const { _id: userId } = await User.create(user);
    return userId;
  } catch (err) {
    throw new AppError("database error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const updatIngDocs = async (
  userId: string,
  { username, email, phone }: UpdateUser
) => {
  try {
    const updatedDocs = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          username,
          email,
          phone,
        },
      },
      { new: true }
    );
    return updatedDocs;
  } catch (err) {
    throw new AppError("database error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

export const getMenuIteams = async () => {
  try {
    const data = await Menu.find();
    return data;
  } catch (err) {
    throw new AppError("database error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
