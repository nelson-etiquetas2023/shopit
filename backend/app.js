import productRoute from "./routes/product.route.js";
import authRoute from "./routes/auth.route.js";
import orderRoute from "./routes/order.route.js";
import express from "express";
import morgan from "morgan";
import errorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import bodyparser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: "*",
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1", productRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", orderRoute);

//Middleware to handle errors.
app.use(errorMiddleware);

// Setting up cloudinary configuration.
cloudinary.config({
  cloud_name: "dpsigbiwg",
  api_key: "884781816896424",
  api_secret: "mIrxKVAbPYo2vLYStqGQN2n4joQ",
  secure: true,
});

export default app;
