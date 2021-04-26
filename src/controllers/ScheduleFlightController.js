const {ScheduleFlight} = require('../models')
const {getHigherPrices} = require('../servicess/scheduleFlight')

async function getLongerFlights(request, response) {
  try {
    let higherPrices = await getHigherPrices(30)
    response.render('higherPrices/index', {higherPrices});
  } catch (error) {
    throw error
  }
}


module.exports = {
  getLongerFlights
}
