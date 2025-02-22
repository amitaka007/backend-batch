import { Router } from "express";

const userRouter = Router();


userRouter.get("/create-user", (req, res) => {
    res.send("Users Page");
});

userRouter.get("/getAllUser" , (req, res) => {
    res.send("Get All Users");
});

userRouter.get("/getUserById" , (req, res) => {
    res.send("Get User By Id");
})


export default userRouter;
