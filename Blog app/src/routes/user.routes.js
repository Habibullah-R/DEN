import { Router } from "express";
import { signup , login ,logout, deleteUser, updateCredentials, updateAvatar, updatePassword } from "../controllers/user.controller.js";
import upload from '../middlewares/multer.middleware.js'
import authorizeToken from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup",
    upload.single("avatar"),
    signup);
router.post("/login",login)
router.post("/logout", authorizeToken ,logout)
router.delete("/delete", authorizeToken ,deleteUser)
router.post("/updatedetails", authorizeToken ,updateCredentials)
router.post("/updateavatar", authorizeToken , upload.single("avatar") ,updateAvatar)
router.post("/updatePassword", authorizeToken , updatePassword)


export default router;