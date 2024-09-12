import { Router } from "express";
import { isAdmin, isAuthenticated, isNotAuthenticated, isUser, isPremium } from "../middleware/auth.js";

import {
  renderLogin,
  renderProducts,
  renderLoginPage,
  renderRegisterPage,
  getProductsForAdmin,
  renderCart,
  renderCartPremium,
  renderProductsPremium,
  showCreateProductPage
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderLogin);
router.get("/products", isAuthenticated, renderProducts);
router.get("/carts/:cid", isAuthenticated, renderCart);
router.get("/login", isNotAuthenticated, renderLoginPage);
router.get("/register", isNotAuthenticated, renderRegisterPage);
router.get("/admin/products", isAuthenticated, isAdmin, getProductsForAdmin);
router.get("/ticket/:tid", isAuthenticated, getProductsForAdmin);

//PREMIUM
router.get("/premium/carts/:cid", isAuthenticated, isPremium, renderCartPremium); // Ruta para carrito premium
router.get("/premium/products", isAuthenticated, isPremium, renderProductsPremium); // Ruta para productos premium



// Ruta para mostrar la página de creación de productos
router.get('/create-product', showCreateProductPage);



export default router;