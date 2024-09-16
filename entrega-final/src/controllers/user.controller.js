import mongoose from 'mongoose';
import UserDAO from '../dao/user/user.dao.js';
import path from 'path';
import UserDTO from '../dto/user.dto.js';
import { sendAccountDeletionEmail } from '../controllers/nodemailer.controller.js';

const userService = new UserDAO();

export const getUsers = async (req, res) => {
    try {
        let users = await userService.getUsers();

        if (!users) {
            return res.status(500).send({ error: "Error al obtener los usuarios" });
        }
        const usersDTO = users.map(user => new UserDTO(user));

        res.render('users', { users: usersDTO });

    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return res.status(500).send({ error: "Error al obtener los usuarios" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).send({ status: "error", message: "ID de usuario no válido" });
        }

        const user = await userService.getUserById(uid);
        if (!user) {
            return res.status(404).send({ status: "error", message: "Usuario no encontrado" });
        }

        res.send({ status: "success", result: user });
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send({ status: "error", message: "Error al obtener el usuario" });
    }
};

export const updateUser = async (req, res) => {
    const { uid } = req.params;
    const updatedData = req.body;

    try {
        const result = await userService.updateUser(uid, updatedData);

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o los datos no cambiaron' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario.', error });
    }
};

export const saveUser = async (req, res) => {
    const user = req.body
    let result = await userService.saveUser(user);

    res.send({ status: "success", result })
};

export const uploadDocuments = async (req, res) => {
    const { uid } = req.params;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No se subieron correctamente los archivos.' });
    }

    const documentData = files.map(file => ({
        name: file.originalname,
        reference: file.path
    }));

    try {
        const user = await userService.getUserById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await userService.addDocuments(uid, documentData);

        res.status(200).json({ message: 'Documentos subidos correctamente', documents: documentData });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir los documentos', error });
    }
};

export const updateLastConnection = async (req, res) => {
    const { uid } = req.params;
    const date = new Date();

    try {
        const result = await userService.updateLastConnection(uid, date);
        
        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o la conexión no cambió' });
        }

        res.status(200).json({ message: 'Última conexión actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la última conexión', error });
    }
};

export const upgradeToPremium = async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await userService.getUserById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const requiredDocuments = [
          "identificacion",
          "comprobante de domicilio",
          "comprobante de estado de cuenta",
        ];
        const uploadedDocumentNames = user.documents.map(doc => path.parse(doc.name).name);
        const missingDocuments = requiredDocuments.filter(doc => !uploadedDocumentNames.includes(doc));

        if (missingDocuments.length > 0) {
            return res.status(400).json({ message: 'Faltan subir documentos requeridos', missingDocuments });
        }
        user.role = 'premium';
        await userService.updateUser(uid, user);

        res.status(200).json({ message: 'El rol del usuario se ha actualizado a premium' });
    } catch (error) {
        console.error('Error al actualizar el rol a premium:', error);
        res.status(500).json({ message: 'Error al actualizar el rol a premium', error });
    }
};

export const deleteInactiveUsers = async (req, res) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    try {
        const { deletedCount, deletedUsers } = await userService.deleteInactiveUsers({
            last_connection: { $lt: twoDaysAgo },
            role: { $ne: 'admin' }
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios inactivos para eliminar' });
        }

        for (const user of deletedUsers) {
            try {
                await sendAccountDeletionEmail(user);
            } catch (emailError) {
                console.error(`Error al enviar el correo de eliminación para el usuario ${user.email}:`, emailError);
            }
        }

        res.status(200).json({
            message: `${deletedCount} usuarios inactivos eliminados`,
            users: deletedUsers.map(user => ({
                id: user._id,
                email: user.email,
                last_connection: user.last_connection
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuarios inactivos', error });
    }
};

export const getUsersAdmin = async (req, res) => {
    try {
        const users = await userService.getUsers();
        const propUsers = users.map(user => ({
            first_name: user.first_name,
            email: user.email,
            role: user.role,
            _id: user._id
        }));

        if (!users) {
            return res.status(404).send('No se encontraron usuarios');
        }

        res.render('admin-users', { users: propUsers });
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send({ error: "Error al obtener los usuarios" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        let { uid } = req.params;

        if (!uid) {
            return res.status(400).send('ID del usuario no proporcionado');
        }
        const result = await userService.deleteUser(uid);
        
        if (!result) {
            return res.status(404).send('Usuario no encontrado');
        }
        
        res.send('Usuario eliminado con éxito');
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).send({ error: "Error al eliminar el usuario" });
    }
};