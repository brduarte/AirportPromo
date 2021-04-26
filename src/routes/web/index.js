var express = require('express');
var router = express.Router();

const ScheduleFlightController = require('../../controllers/ScheduleFlightController')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/flights/longer', ScheduleFlightController.getLongerFlights)

module.exports = router;
