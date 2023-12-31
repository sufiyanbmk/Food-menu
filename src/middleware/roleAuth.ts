import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import { HttpStatus } from "../types/httpStatus";
import { verifyToken } from "../helper/authHelper";

const roleAuthMiddleware = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
      if (role !== payload.role) {
        throw new AppError("You are not allowed", HttpStatus.UNAUTHORIZED);
      }
      next();
    } catch (err) {
      throw new AppError("UnAuthorized User", HttpStatus.UNAUTHORIZED);
    }
  };
};

export default roleAuthMiddleware;
