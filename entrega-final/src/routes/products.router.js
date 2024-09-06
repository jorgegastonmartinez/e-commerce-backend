import { Router } from "express";
import { isAuthenticated, isUser } from "../middleware/auth.js";
import {
    getProducts,
    getProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/products", isAuthenticated, getProducts);
router.get("/products/:pid", isAuthenticated, isUser, getProductById);

export default router;