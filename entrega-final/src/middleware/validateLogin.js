import { body, validationResult } from 'express-validator';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const validateLogin = [
    body('email')
        .isEmail().withMessage('Por favor ingresa un email válido')
        .custom(async (value) => {
            const user = await userModel.findOne({ email: value });
            if (!user) {
                return Promise.reject('No existe una cuenta con este email.');
            }
        }),
    body('password')
        .exists().withMessage('La contraseña es requerida')
        .custom(async (value, { req }) => {
            const user = await userModel.findOne({ email: req.body.email });
            if (user && !(await bcrypt.compare(value, user.password))) {
                return Promise.reject('La contraseña es incorrecta.');
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if (!req.session.failedAttempts) {
                req.session.failedAttempts = {};
            }
            const email = req.body.email;

            if (!req.session.failedAttempts[email]) {
                req.session.failedAttempts[email] = 0;
            }
            req.session.failedAttempts[email]++;
            
            if (req.session.failedAttempts[email] >= 3) {
                return res.redirect('/api/sessions/forgot-password');
            }
            
            return res.render('login', {
                errors: errors.array(),
                formData: req.body
            });
        }
        next();
    }
];