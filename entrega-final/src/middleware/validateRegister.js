import { body, validationResult } from 'express-validator';
import userModel from '../models/user.model.js';

export const validateRegister = [
    body('email')
        .isEmail().withMessage('El formato de email no es válido')
        .custom(async (email) => {
            const user = await userModel.findOne({ email });
            if (user) {
                throw new Error('El email ya esta registrado');
            }
            return true;
        }),
    body('age')
        .isInt({ min: 18 }).withMessage('Debes de tener al menos 18 años de edad')
        .toInt(),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe de tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', { 
                errors: errors.array(),
                formData: req.body 
            });
        }
        next();
    }
];