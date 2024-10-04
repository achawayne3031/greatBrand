const express = require('express')
const router = express.Router()
const eventController = require('../controller/eventController')


router.post('/create', eventController.createEvent)
router.get('/status/:event', eventController.getEvent)







module.exports = router;