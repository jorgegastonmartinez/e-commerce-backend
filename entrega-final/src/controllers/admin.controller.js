import User from '../dao/user/user.dao.js';
const userService = new User()

export const changeUserRole = async (req, res) => {
    try {
        const { userId, role } = req.body;

        if (!userId || !role || (role !== 'premium' && role !== 'user')) {
            return res.status(400).send({ error: 'ID de usuario o rol inválido' });
        }

        const result = await userService.updateUserRole(userId, role);

        if (!result) {
            return res.status(500).send({ error: 'Error al actualizar el rol del usuario' });
        }

        res.send({ success: 'Rol del usuario actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el rol del usuario:', error);
        res.status(500).send({ error: 'Error al actualizar el rol del usuario' });
    }
};