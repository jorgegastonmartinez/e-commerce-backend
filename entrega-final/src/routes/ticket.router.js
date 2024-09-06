import { Router } from "express";
import { getTickets, getTicketById, renderTicket, createTicket } from '../controllers/ticket.controller.js'

const router = Router()

router.get('/ticket', getTickets)
router.get('/ticket/:tid', getTicketById)
router.get('/ticket/view/:tid', renderTicket);
router.post('/carts/:cid/purchase', createTicket);

export default router;