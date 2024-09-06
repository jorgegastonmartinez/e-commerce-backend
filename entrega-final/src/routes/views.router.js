import { Router } from "express";
import { isAdmin, isAuthenticated, isNotAuthenticated, isUser } from "../middleware/auth.js";

import {
  renderLogin,
  renderProducts,
  renderLoginPage,
  renderRegisterPage,
  getProductsForAdmin,
  renderCart
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderLogin);
router.get("/products", isAuthenticated, isUser, renderProducts);
router.get("/carts/:cid", isAuthenticated, isUser, renderCart);
router.get("/login", isNotAuthenticated, renderLoginPage);
router.get("/register", isNotAuthenticated, renderRegisterPage);
router.get("/admin/products", isAuthenticated, isAdmin, getProductsForAdmin);
router.get("/ticket/:tid", isAuthenticated, getProductsForAdmin);

export default router;