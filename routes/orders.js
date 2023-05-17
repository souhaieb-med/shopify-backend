import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../verifyToken.js";
import { addOrder, deleteOrder, getAllOrders, getMonnthlyOrders, getUserOrder, updateOrder } from "../controllers/order.js";

const router = express.Router();

// CREATE ORDER
router.post("/", verifyToken , addOrder)

// UPDATE ORDER
router.put("/:id", verifyTokenAndAdmin, updateOrder)

// GET USER ORDERS
router.get("/find/:userId", verifyToken , getUserOrder)

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, getAllOrders)

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, deleteOrder)

// GET MONTH INCOM
router.get("/income", verifyTokenAndAdmin, getMonnthlyOrders)


export default router;
