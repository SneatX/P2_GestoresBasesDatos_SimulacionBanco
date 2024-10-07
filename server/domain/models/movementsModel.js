const { ObjectId } = require("mongodb");
const ConnectToDatabase = require("../../infrastructure/database/mongoDB");

class MovementsModel {
    async findById(id) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('movements');
        const [res] = await collection.find({ _id: new ObjectId(id) }).toArray();
        return res;
    }

    async newTransaction(newMovement) {
        let obj = ConnectToDatabase.instanceConnect;

        const usersCollection = obj.db.collection('users');
        let user = await usersCollection.findOne({ _id: new ObjectId(newMovement.userId) });

        let userBalance = user.balance += newMovement.amount;

        if (userBalance < 0) {
            throw new Error('Fondos insuficientes para realizar la transacción');
        }

        const movementsCollection = obj.db.collection('movements');
        let result = await movementsCollection.insertOne(newMovement);

        await usersCollection.updateOne({ _id: new ObjectId(newMovement.userId) }, { $set: { balance: userBalance } });
        return result;
    }

    async aggregate(data) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('movements');
        const res = await collection.aggregate([...data]).toArray();
        return res;
    }

    async insert(userData) {
        let obj = ConnectToDatabase.instanceConnect;
        const collection = obj.db.collection('movements');
        const res = await collection.insertMany([userData]);
        return res;
    }
}

module.exports = MovementsModel;