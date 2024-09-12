import { Router } from "express";
import { upload } from "../utils.js";
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

router.get('/users/', getUsers);
router.get('/users/:uid', getUserById)
router.post('/users/', saveUser)
router.put('/users/:uid', updateUser);
router.post('/users/:uid/documents', upload.array('documents'), uploadDocuments);
router.put('/users/:uid/last-connection', updateLastConnection);
router.delete('/users/inactive', deleteInactiveUsers);

export default router;