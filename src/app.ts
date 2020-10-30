// import * as dotenv from "dotenv";
// dotenv.config({ path: __dirname + "/.env" });
// require("dotenv").config({ path: __dirname + "/.env" });
// import "dotenv/config";
// import { config } from "dotenv";
// import { resolve } from "path";
// config({ path: resolve(__dirname, ".env") });
import "reflect-metadata";
import express, { Application } from "express";
import userRouter from "./routers/userRouter";
import { createConnection } from "typeorm";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// "esModuleInterop": true
const PORT: number = 5000;
const handleStart = () => console.log(`Listening on port ${PORT}`);

createConnection()
  .then(async (connection) => {
    console.log("db connected!!");
    const app: Application = express();
    console.log(process.env.PORT);

    app.use(cors());
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());

    // route
    app.use("/api/user", userRouter);

    app.listen(PORT, handleStart);
  })
  .catch((err) => console.log(err));
