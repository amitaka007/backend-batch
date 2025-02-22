import { Router } from "express";
import { login, logout } from "../controller/auth.controller.js";


const router = Router();

// login and logout
router.post("/login" ,login);

router.get("/logout" , logout)

export default router;