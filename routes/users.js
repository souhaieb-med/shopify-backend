import express from "express";
import {
  update,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStat,
} from "../controllers/user.js";
import { verifyToken, verifyTokenAndAdmin } from "../verifyToken.js";

const router = express.Router();

//get a user
router.get("/find/:id", getUser);

//get all users 
router.get("/",verifyTokenAndAdmin, getAllUsers);

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get user stats 
router.get("/stats", verifyTokenAndAdmin , getUserStat);


export default router;
