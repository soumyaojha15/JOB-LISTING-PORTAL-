import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import jobSeekerrouter from "./routes/jobSeekerRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/ApplicationRouter.js";
import notFound from "./Middleware/notFound.js";

const app = express();
connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! from soumya");
});

app.use("/api/jobseeker", jobSeekerrouter);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/uploads", express.static("uploads"));
app.use(notFound);

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
