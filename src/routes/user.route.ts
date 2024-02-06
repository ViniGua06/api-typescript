import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();

const userController = new UserController();

userRouter.get("/users", userController.getAllUsers);
userRouter.post("/user", userController.createUser);
userRouter.patch("/user/:id", userController.updateUser);
userRouter.post("/login", userController.loginUSer);

export default userRouter;
