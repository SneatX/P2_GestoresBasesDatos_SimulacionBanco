const express = require('express')
const router = express.Router()

const movementsController = require('../controllers/movementsController')

router.post('/new-transaction', movementsController.newTransaction)

module.exports = router