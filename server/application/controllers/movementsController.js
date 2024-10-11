const MovementsModel = require('../../domain/models/movementsModel');
const {ObjectId} = require('mongodb');

class MovementsController {
    async newTransaction(req, res) {
        try {
            let newMovement = {
                userId: new ObjectId(req.user._id),
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

    async getUserMovements(req, res) {
        try{

            let result = await new MovementsModel().getMovements(req.user._id);

            res.status(200).json({ data: result });
        } catch (error) {
            res.status(500).json({
                msj: "Error al obtener usuario",
                error: error
            });
        }
    }
}

module.exports = new MovementsController();