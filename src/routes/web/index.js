var express = require('express');
var router = express.Router();

const ScheduleFlightController = require('../../controllers/ScheduleFlightController')

router.get('/', ScheduleFlightController.getLongerFlights)

module.exports = router;
