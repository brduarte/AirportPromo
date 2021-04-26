const dotenv = require('dotenv')
const moment = require('moment')
const {ScheduleFlight} = require('../models')
const {getAirPort, getScheduledFlightsByDate} = require('../servicess/mockupAirportAPI')
const {
  getDistanceFromLatLonInKm,
  calculateFlightDurationInHours,
  calculateAverageSpeed,
  calculatepricePerFare
} = require('../utilities')

dotenv.config()

flightProcessor()

async function flightProcessor() {
  try {
    const {data} = await getAirPort()
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

        let schedule = await ScheduleFlight.findOne({
          where: {endpoint_url: scheduledFlights.endpoint_url}
        })

        if (schedule !== null) continue;

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

        ScheduleFlight.create({
          departure_iata: scheduledFlights.summary.from.iata,
          arrival_iata: scheduledFlights.summary.to.iata,
          distance: scheduledFlights.summary.distance.value,
          min_value: scheduledFlights.lowerOption.fare_price,
          aircraft_model: scheduledFlights.lowerOption.aircraft.model,
          endpoint_url: scheduledFlights.endpoint_url
        })
      }
    }
  } catch (error) {
    throw error
  }
}

