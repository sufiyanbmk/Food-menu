import { NextFunction, Request, Response } from "express";
import CustomRequest from "../types/nameSpace";
import AppError from "../utils/appError";
import { HttpStatus } from "../types/httpStatus";
import { verifyToken } from "../helper/authHelper";

declare module "express" {
  export interface Request {
    userId?: string;
  }
}

const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    req.userId = payload;
    next();
  } catch (err) {
    throw new AppError("UnAuthorized User", HttpStatus.UNAUTHORIZED);
  }
};

export default userAuthMiddleware;
