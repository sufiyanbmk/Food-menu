import express, { Application, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";
import helmet from "helmet";
import errorHandlingMidlleware from "./middleware/errorHandling";
import routes from "./routes";
import AppError from "./utils/appError";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app: Application = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(json());
app.use(helmet({ xssFilter: true }));

//Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize());

// routes for each endpoint
routes(app);

app.use(errorHandlingMidlleware);

// catch 404 and forward to error handler
app.all("*", (req, res, next: NextFunction) => {
  next(new AppError("Not found", 404));
});

export { app };
