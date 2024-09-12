import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.get('/products', isAuthenticated, getProducts);
router.get('/products/:pid', isAuthenticated, getProductById);

export default router;