import express from "express";
import { changePassword, createUser, getUserData,getAllUsers,toggleBlockUser,  googleLogin, loginUser, sendOTP, updateUserData, verifyOTPAndResetPassword } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/me", getUserData)
userRouter.put("/", updateUserData)
userRouter.put("/password", changePassword)
userRouter.post("/google-login", googleLogin)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/verify-otp", verifyOTPAndResetPassword)
userRouter.get("/all/:pageSize/:currentPage", getAllUsers)
userRouter.put("/:action/:userId", toggleBlockUser)

export default userRouter;