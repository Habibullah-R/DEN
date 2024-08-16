import { Router } from "express";
import authorizeToken from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createPost,
  getCurrentUserPosts,
  deleteCurrentPost,
  getAllPosts,
  updateImage,
  updateContent,
  getPostBySlug,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/createPost", authorizeToken, upload.single("image"), createPost);
router.get("/getCurrentUserPosts", authorizeToken, getCurrentUserPosts);
router.get("/getAllPosts", getAllPosts);
router.delete("/deletePost/:postId/:userId", authorizeToken, deleteCurrentPost);
router.post(
  "/updateImage/:postId/:userId",
  authorizeToken,
  upload.single("image"),
  updateImage
);
router.post("/updateContent/:postId/:userId", authorizeToken, updateContent);
router.get("/getPost/:postSlug",getPostBySlug)

export default router;
