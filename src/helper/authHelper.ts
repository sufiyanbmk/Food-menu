import jwt from "jsonwebtoken";
import configKeys from "../config";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export const generateToken = (payload: object | string) => {
  const token = jwt.sign({ payload }, configKeys.JWT_SECERET_KEY, {
    expiresIn: "5d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, configKeys.JWT_SECERET_KEY);
};

export const encryptPassword = async (password: string) => {
  const salt = randomBytes(8).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString("hex")}.${salt}`;
};

export const comparePassword = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString("hex") === hashedPassword;
};
