const MovementsModel = require('../../domain/models/movementsModel');

class MovementsController {
    async newTransaction(req, res) {
        try {
            let newMovement = {
                userId: req.user._id,
                amount: req.body.amount,
                date: new Date()
            }
            let result = await new MovementsModel().newTransaction(newMovement);

            res.status(200).json({
                msj: "Transacción creada correctamente",
                result: result
            });
        } catch (error) {
            res.status(400).json({
                msj: "Error al crear transacción",
                error: error.message 
            });
        }
    }
}

module.exports = new MovementsController();