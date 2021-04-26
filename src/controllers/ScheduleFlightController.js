const {getHigherPrices, getStateWithMoreAirports, getScheduleDetailFlight} = require('../servicess/scheduleFlight')

async function getLongerFlights(request, response) {
  try {
    let higherPrices = await getHigherPrices(30)
    let stateWithMoreAirports = await getStateWithMoreAirports()
    stateWithMoreAirports = stateWithMoreAirports[0]
    let scheduleDetailFlights = await getScheduleDetailFlight()

    response.render('higherPrices/index', {
      higherPrices,
      stateWithMoreAirports,
      scheduleDetailFlights
    });
  } catch (error) {
    throw error
  }
}


module.exports = {
  getLongerFlights
}
