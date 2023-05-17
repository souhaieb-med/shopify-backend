import express from "express"
import { payment } from "../controllers/stripePayment.js";

const router = express.Router();

router.post("/payment", payment)

export default router;