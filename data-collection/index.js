const dotenv = require('dotenv')
const moment = require('moment')
const {saveScheduleFlight, getFlightScheduleByEndpoint} = require('./utilities/database')
const {
  fetchMockupAirPortAPI,
  getScheduledFlightsByDate,
  getDistanceFromLatLonInKm,
  calculateFlightDurationInHours,
  calculateAverageSpeed,
  calculatepricePerFare
} = require('./utilities/index')

dotenv.config()
flightProcessor()

async function flightProcessor() {
  try {
    const {data} = await fetchMockupAirPortAPI('airports').get()
    const airports = Object.values(data).slice(0, 40)

    for (const airportA of airports) {
      for (const airportB of airports) {
        if (airportA.iata === airportB.iata) continue;

        let {
          data: scheduledFlights,
          request: {res}
        } = await getScheduledFlightsByDate(airportA, airportB, moment().add(40, 'days').format('YYYY-MM-DD'))

        if (!scheduledFlights.options.length) continue;
        scheduledFlights.endpoint_url = res.responseUrl

        let {rows} = await getFlightScheduleByEndpoint(scheduledFlights.endpoint_url)
        if (rows.length) continue;

        scheduledFlights.lowerOption = scheduledFlights.options[0];
        scheduledFlights.summary.distance = {
          value: getDistanceFromLatLonInKm(airportA, airportB),
          type: 'Km'
        }

        scheduledFlights.options.forEach(option => {
          if (option.fare_price > scheduledFlights.lowerOption.fare_price) return;

          let flightHours = calculateFlightDurationInHours(option.departure_time, option.arrival_time)

          option.fare_per_KM = {
            value: calculatepricePerFare(option.fare_price, scheduledFlights.summary.distance.value),
            type: 'R$'
          }

          option.average_speed = {
            value: calculateAverageSpeed(flightHours, scheduledFlights.summary.distance.value),
            type: 'KM/h'
          }

          scheduledFlights.lowerOption = option
          delete scheduledFlights.options
        });

        await saveScheduleFlight(scheduledFlights)
      }
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

