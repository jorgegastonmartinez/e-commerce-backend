import { Router } from "express";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller.js";

import { deleteMessage } from "../controllers/views.controller.js";

import { getUsersAdmin, deleteUser } from "../controllers/user.controller.js";

import { changeUserRole } from "../controllers/admin.controller.js";

const router = Router();

router.get("/admin/products", isAuthenticated, isAdmin, getProducts);
router.post("/admin/products", isAuthenticated, isAdmin, createProduct);
router.put("/admin/products/:pid", isAuthenticated, isAdmin, updateProduct);
router.delete("/admin/products/:pid", isAuthenticated, isAdmin, deleteProduct);
router.delete('/admin/messages/:mid', isAuthenticated, isAdmin, deleteMessage);

//


router.get('/admin/users', isAuthenticated, isAdmin, getUsersAdmin);
router.delete("/admin/users/:uid", isAuthenticated, isAdmin, deleteUser);
router.post('/admin/users/change-role', isAuthenticated, isAdmin, changeUserRole);



export default router;