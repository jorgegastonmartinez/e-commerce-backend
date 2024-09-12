import userModel from "../../models/user.model.js";

export default class UserDAO {

    getUsers = async () => {
        try {
            let users = await userModel.find();

            return users;
        } catch (error) {
            console.log(error)
            return null;
        }
    };

    getUserById = async (id) => {
        try {
            let user = await userModel.findOne({ _id: id });

            return user;
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            throw new Error("Ocurrió un error al obtener el usuario");
        }
    };

    saveUser = async (user) => {
        try {
            let result = await userModel.create(user);

            return result
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async (id, user) => {
        try {
            let result = await userModel.updateOne({ _id: id }, { $set: user });

            return result
        } catch (error) {
            console.log(error)
        }
    };

    addDocuments = async (id, documents) => {
        try {
            const result = await userModel.updateOne(
                { _id: id },
                { $push: { documents: { $each: documents } } }
            );

            return result;
        } catch (error) {
            console.error("Error al agregar documentos:", error);
            throw new Error("Ocurrió un error al agregar documentos");
        }
    };

    updateLastConnection = async (id, date) => {
        try {
            const result = await userModel.updateOne(
                { _id: id },
                { $set: { last_connection: date } }
            );

            return result;
        } catch (error) {
            console.error("Error al actualizar last_connection:", error);
            throw new Error("Ocurrió un error al actualizar la última conexión");
        }
    }

    deleteInactiveUsers = async (condition) => {
        try {
            const inactiveUsers = await userModel.find(condition);

            if (inactiveUsers.length === 0) {
                return { deletedCount: 0, deletedUsers: [] };
            };
            const result = await userModel.deleteMany(condition);
            
            return { deletedCount: result.deletedCount, deletedUsers: inactiveUsers };
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    deleteUser = async (id) => {
        try {
           return await userModel.deleteOne({ _id: id });
        } catch (error) {
            console.error("Error en deleteUser:", error);
            throw new Error("Error en deleteUser");
        }
    };

    updateUserRole = async (userId, role) => {
        try {
            const user = await userModel.findById(userId);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            user.role = role;

            await user.save();

            return user;
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
            return null;
        }
    };
};