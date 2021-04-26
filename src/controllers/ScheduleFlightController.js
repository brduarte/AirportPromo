const {ScheduleFlight} = require('../models')

async function getLongerFlights(request, response) {
  try {
    console.log(ScheduleFlight.findAll())
    // let test = await ScheduleFlight.findAll()
    // console.log(test)
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
