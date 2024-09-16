import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createCart,
  getCart,
  addProductToCart,
  removeProductFromCart,
  updateCart,
  updateProductQuantity,
  clearCart,
  purchaseCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.post('/carts', isAuthenticated, createCart);
router.get('/carts/:cid', isAuthenticated, getCart);
router.post('/carts/:cid/products/:pid', isAuthenticated, addProductToCart);
router.delete('/carts/:cid/products/:pid', isAuthenticated, removeProductFromCart);
router.put('/carts/:cid', isAuthenticated, updateCart);
router.put('/carts/:cid/products/:pid', isAuthenticated, updateProductQuantity);
router.delete('/carts/:cid', isAuthenticated, clearCart);
router.post('/carts/:cid/purchase', purchaseCart);

export default router;