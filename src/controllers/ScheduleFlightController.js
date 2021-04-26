const {ScheduleFlight} = require('../models')
const {getHigherPrices, getStateWithMoreAirports} = require('../servicess/scheduleFlight')

async function getLongerFlights(request, response) {
  try {
    let higherPrices = await getHigherPrices(30)
    let stateWithMoreAirports = await getStateWithMoreAirports()
    stateWithMoreAirports = stateWithMoreAirports[0]
    response.render('higherPrices/index', {
      higherPrices,
      stateWithMoreAirports
    });
  } catch (error) {
    throw error
  }
}


module.exports = {
  getLongerFlights
}
