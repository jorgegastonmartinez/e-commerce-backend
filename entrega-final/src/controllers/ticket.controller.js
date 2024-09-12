import Ticket from '../dao/ticket/ticket.dao.js'
import Cart from "../dao/cart/cart.dao.js"
import cartsModel from '../models/cart.model.js';
import UserDTO from "../dto/user.dto.js";

const ticketsService = new Ticket()
const cartService = new Cart()

export const getTickets = async (req, res) => {
    try {
        let result = await ticketsService.getTickets()
        res.send({ status: "success", result })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

export const getTicketById = async (req, res) => {
    const { tid } = req.params
    try {
        let ticket = await ticketsService.getTicketById(tid)
        res.send({ status: "success", result: ticket })
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

export const createTicket = async (req, res) => {
    const { cid } = req.params;
    const userEmail = req.session.user.email; 

    try {
        const cartResult = await cartService.getCartById(cid);
        const cart = cartResult.cart;

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        const purchase_datetime = new Date(); 
        const amount = cart.total; 
        const ticket = await ticketsService.createTicket({
            purchase_datetime,
            amount,
            purchaser: userEmail,  
            cartId: cid           
        });

        await cartsModel.findByIdAndUpdate(cid, { products: [], total: 0 });

        res.redirect(`/api/ticket/view/${ticket._id}`);
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message })
    }
}

export const renderTicket = async (req, res) => {
    const { tid } = req.params;

    try {
        const ticket = await ticketsService.getTicketById(tid);
        if (!ticket) {
            return res.status(404).render('error', { message: 'Ticket no encontrado' });
        }
        const cart = await cartsModel.findById(ticket.cartId).populate('products.product').lean();
        if (!cart) {
            return res.status(404).render('error', { message: 'Carrito no encontrado' });
        }

        const isCartEmpty = cart && cart.products.length === 0; 
        const userDTO = new UserDTO(req.session.user);
        const ticketData = {
            id: ticket._id.toString(),
            amount: ticket.amount,
            purchaser: userDTO, 
            cartId: ticket.cartId.toString(),
            code: ticket.code,
            purchase_datetime: ticket.purchase_datetime,
            isCartEmpty: isCartEmpty,

            role: req.session.user.role // Asegúrate de pasar el rol
        };

        res.render('ticket', { ticket: ticketData,      userRole: req.session.user.role });
    } catch (error) {
        console.error('Error al obtener el ticket:', error);
        res.status(500).render('error', { message: 'Error interno del servidor' });
    }
};