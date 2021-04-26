const ScheduleFlight = require('../models/ScheduleFlight')

async function getLongerFlights(request, response) {
  try {
    console.log(ScheduleFlight.findAll())
    // let test = await ScheduleFlight.findAll()
    // console.log(test)
    response.json({
      'h1': 'oi bruno'
    })
  } catch (error) {
    response.json(error.message)
  }
}


module.exports = {
  getLongerFlights
}
