import { Router } from "express";
import { isAuthenticated, isPremium } from "../middleware/auth.js";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { upgradeToPremium } from "../controllers/user.controller.js";

const router = Router();

router.get('/premium/products', isAuthenticated, isPremium, getProducts);
router.post('/premium/products', isAuthenticated, isPremium, createProduct);
router.put('/premium/products/:pid', isAuthenticated, isPremium, updateProduct);
router.put('/premium/:uid', isAuthenticated, upgradeToPremium);
// router.delete('/premium/products/:pid', isAuthenticated, isPremium, deleteProduct);

export default router; 