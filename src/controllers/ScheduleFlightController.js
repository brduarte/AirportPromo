const {ScheduleFlight} = require('../models')

async function getLongerFlights(request, response) {
  try {
    let test = await ScheduleFlight.findAll()
    response.json({
      'h1': 'oi bruno'
    })
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  getLongerFlights
}
