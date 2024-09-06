import mongoose from "mongoose";
import productModel from "../models/product.model.js";
import messageModel from '../models/message.model.js';
import cartModel from "../models/cart.model.js";

export const renderLogin = async (req, res) => {
    res.render("login", {});
};

export const renderProducts = async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    let result = await productModel.paginate({}, { page, limit: 10, lean: true });result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/products?page=${result.prevPage}`
    : '';
    result.nextLink = result.hasNextPage
    ? `http://localhost:8080/products?page=${result.nextPage}`
    : '';
    result.isValid = !(page <= 0 || page > result.totalPages);


    const user = req.session.user;
    // const cartId = req.session.cartId || user.cartId;

    const cartId = user ? user.cart : null;

    console.log("Cart ID:", cartId);  // Verifica que este log muestra el cartId correctamente

    res.render("products", { ...result, user, cartId});
};


// export const renderCart = async (req, res) => {
//     try {
//         const { cid } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(cid)) {
//             console.error(`ID de carrito no válido: ${cid}`);
//             return res.status(400).json({ error: "ID de carrito no válido" });
//         }

//         // Obtener el carrito de la base de datos
//         let cart = await cartModel.findById(cid).populate('products.product').populate('user').lean();

//         if (!cart) {
//             console.error(`Carrito no encontrado para ID: ${cid}`);
//             return res.status(404).json({ error: "Carrito no encontrado" });
//         }

//         console.log('Carrito encontrado:', cart);

//         // Renderizar la vista con los productos del carrito
//         res.render('carts', { cart });
//     } catch (error) {
//         console.error("Error al obtener el carrito:", error);
//         res.status(500).json({ error: "Ocurrió un error al obtener el carrito" });
//     }
// };




export const renderCart = async (req, res) => {
    const { cid } = req.params;

    try {
        const cartId = req.session.cartId || user.cartId;

        const user = req.session.user;  // Obtener el usuario desde la sesión

        const cart = await cartModel.findById(cid).populate('products.product').lean();  

        if (!cartId) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        // Renderizar la vista 'carts' con los productos del carrito y el usuario
        res.render("carts", { cart, user });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return res.status(500).json({ error: "Error al obtener el carrito" });
    }
};



export const renderLoginPage = (req, res) => {
    res.render("login");
};

export const renderRegisterPage = (req, res) => {
    res.render("register");
};

export const getProductsForAdmin = async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) page = 1;

    let result = await productModel.paginate({}, { page, limit: 10, lean: true });
    result.prevLink = result.hasPrevPage
    ? `http://localhost:8080/admin/products?page=${result.prevPage}`
    : '';
    result.nextLink = result.hasNextPage
    ? `http://localhost:8080/admin/products?page=${result.nextPage}`
    : '';
    result.isValid = !(page <= 0 || page > result.totalPages);

    const user = req.session.user;
    const messages = await messageModel.find().populate('user').lean();

    res.render("admin-products", { ...result, user, messages });
};

export const deleteMessage = async (req, res) => {
    try {
        const { mid } = req.params;
        await messageModel.findByIdAndDelete(mid);
        res.status(200).send('Mensaje eliminado');
    } catch (error) {
        res.status(500).send(error.message);
    }
};