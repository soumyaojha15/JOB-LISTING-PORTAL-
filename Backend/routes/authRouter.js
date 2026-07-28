import express from "express";
import { isAuthenticated, login, logout, register, } from "../controller/authController.js";
import userAuth from "../Middleware/userAuth.js";


const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post('/is-auth', userAuth, isAuthenticated);

export default authRouter;