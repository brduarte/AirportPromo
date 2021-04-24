import dotenv from 'dotenv'
import moment from "moment"
import {
  fetchMockupAirPortAPI,
  getScheduledFlightsByDate,
  getDistanceFromLatLonInKm,
  calculateFlightDurationInHours,
  calculateAverageSpeed,
  calculatepricePerFare
} from './utilities/index.js'

import {saveScheduleFlight} from './utilities/database.js'

dotenv.config()

flightProcessor()

async function flightProcessor() {
  try {
    const {data} = await fetchMockupAirPortAPI('airports').get()
    const airports = Object.values(data).slice(0, 3)

    for (const airportA of airports) {
      for (const airportB of airports) {
        let {data: scheduledFlights, request:{res}} = await getScheduledFlightsByDate(airportA, airportB, moment().add(40, 'days').format('YYYY-MM-DD'))
        scheduledFlights.endpoint_url =  res.responseUrl
        scheduledFlights.lowerOption = scheduledFlights.options[0];

        scheduledFlights.summary.distance = {
          value: getDistanceFromLatLonInKm(airportA, airportB),
          type: 'Km'
        }

        if (airportA.iata === airportB.iata) continue;

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

        saveScheduleFlight(scheduledFlights)

      }
    }
  } catch (error) {
    throw error
  }
}

