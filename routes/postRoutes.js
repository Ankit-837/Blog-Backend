import express from "express"; 
const router = express.Router();
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

router.get("/", auth, getAllPosts);
router.get("/:id", getPostById);
router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

export default router;
