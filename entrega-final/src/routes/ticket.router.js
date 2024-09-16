import { Router } from "express";
import {
  getTickets,
  getTicketById,
  renderTicket,
  createTicket,
} from "../controllers/ticket.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router()

router.get('/ticket', isAuthenticated, getTickets)
router.get('/ticket/:tid', isAuthenticated, getTicketById)
router.get('/ticket/view/:tid', isAuthenticated, renderTicket);
router.post('/carts/:cid/purchase', isAuthenticated, createTicket);

export default router;