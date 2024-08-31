import { Router } from "express";
import { sendMessage , getMessages } from "../controllers/conversation.controller.js";
import authorizeToken from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id",authorizeToken,getMessages)
router.post("/send/:id", authorizeToken ,sendMessage)

export default router