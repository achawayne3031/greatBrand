const express = require('express')
const router = express.Router()
const ticketController = require('../controller/ticketController')


router.get('/tickets', ticketController.getAllTickets)
router.post('/book', ticketController.bookTicket)
router.post('/cancel', ticketController.cancelTicket)






module.exports = router;