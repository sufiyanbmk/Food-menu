import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  PORT: process.env.PORT as string,

  MONGO_URI: process.env.MONGO_URI as string,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,

  JWT_SECERET_KEY: process.env.JWT_SECERET_KEY as string,

  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,

  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,

  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
};

export default configKeys;
