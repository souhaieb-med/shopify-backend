import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../verifyToken.js";
import {
  addCart,
  deleteCart,
  getAllCarts,
  getUserCart,
  updateCart,
} from "../controllers/cart.js";

const router = express.Router();

// create cart
router.post("/", verifyToken, addCart);

//update
router.put("/:id", verifyToken, updateCart);

//delete
router.delete("/:id", verifyToken, deleteCart);

//get user cart
router.get("/find/:userid", verifyToken, getUserCart);

//get all carts
router.get("/", verifyTokenAndAdmin, getAllCarts);

export default router;
