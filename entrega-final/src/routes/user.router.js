import { Router } from "express";
import { upload } from "../utils.js";
import { validateRegister } from "../middleware/validateRegister.js";
import { isAuthenticated, isAdmin } from "../middleware/auth.js";
import {
  getUsers,
  getUserById,
  saveUser,
  uploadDocuments,
  updateLastConnection,
  updateUser,
  deleteInactiveUsers
} from "../controllers/user.controller.js";

const router = Router();

router.get('/users', isAuthenticated, isAdmin, getUsers);
router.get('/users/:uid', getUserById)
router.post('/users', validateRegister, saveUser)
router.put('/users/:uid', updateUser);
router.post('/users/:uid/documents', upload.array('documents'), uploadDocuments);
router.put('/users/:uid/last-connection', updateLastConnection);
router.delete('/users/inactive', isAuthenticated, isAdmin, deleteInactiveUsers);

export default router;