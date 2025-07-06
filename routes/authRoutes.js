import express from "express";
const router = express.Router();
import {
  register,
  login,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";

router.post("/register", register);
router.post("/login", login);
// Super Admin Only
router.get("/", auth, role(["superadmin"]), getAllUsers);
router.put("/update-role", auth, role(["superadmin"]), updateUserRole);
router.delete("/:userId", auth, role(["superadmin"]), deleteUser);

export default router;
