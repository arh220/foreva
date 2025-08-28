require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routers/userRoutes");
const adminRouter = require("./routers/adminRoutes");
const cookieParser = require("cookie-parser");
const { cloudinaryConfig } = require("./utils/cloudinary");

const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongoDB connected..."));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("server started...");
  cloudinaryConfig();
});
