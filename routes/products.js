import express from "express";
import { verifyTokenAndAdmin } from "../verifyToken.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

//create product
router.post("/", verifyTokenAndAdmin, addProduct);

//update product
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//delete product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//get product
router.get("/:id", getProduct);

//get all products
router.get("/", getAllProducts);

export default router;
