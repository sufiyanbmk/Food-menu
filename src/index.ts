import mongoose from "mongoose";
import { app } from "./app";
import configKeys from "./config";

const start = async () => {
  try {
    await mongoose.connect(configKeys.MONGO_URI, {
      dbName: "food-menu",
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const port = configKeys.PORT;
  app.listen(port, () =>
    console.log(`
    ==================================
    🚀 Server running on port ${port}!🚀
    ==================================
  `)
  );
};

start();
