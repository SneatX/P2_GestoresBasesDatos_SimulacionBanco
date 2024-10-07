const UsersModel = require('../../domain/models/usersModel');

class UsersController {
    async getUser(req, res) {
        try {
            let result = await new UsersModel().findById(req.user._id);

            res.status(200).json({data: result});
        } catch (error) {
            res.status(500).json({
                msj: "Error al obtener usuario",
                error: error
            });
        }
    }
}

module.exports = new UsersController();