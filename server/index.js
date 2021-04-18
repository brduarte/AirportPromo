import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

start()

async function start() {

    const { data } = await fetchMockupAirPortAPI('airports').get()
    const airports = convertObjectToArray(data)
    const combinationsAirPorts = flightProcessor(airports.slice(0, 3))
    console.log(combinationsAirPorts);

}


function flightProcessor(airports) {
    let result = [];

    if (airports.length === 0) {
        result.push([]);
    } else {
        for (var i = 0; i < airports.length; i++) {
            let firstAirport = airports[i];

            for (var j = 0; j < airports.length; j++) {
                if (airports[j].iata === firstAirport.iata) {
                    continue;
                }
                result.push([firstAirport].concat(airports[j]));
            }
        }
    }
    return result;
}

async function getScheduledFlights(airportA, airportB, data) {
    try {

    } catch (error) {
        throw error;
    }
}

// O sacrificio da performance :(
function convertObjectToArray(airports) {
    let result = []

    for (const key in airports) {
        result.push(airports[key])
    }

    return result;
}

function getDistanceFromLatLonInKm(pointA = { lat: '', lon: '' }, pointB = { lat: '', lon: '' }) {
    const raio = 6371; // Raio da Terra em KM
    let dLat = deg2rad(pointB.lat - pointA.lat);
    let dLon = deg2rad(pointB.lat - pointA.lat);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pointA.lat)) * Math.cos(deg2rad(pointB.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distancia = raio * c; // Distance in km

    // Converte o número em graus ao equivalente em radianos
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    return Math.round(distancia);
}

function fetchMockupAirPortAPI(uri) {
    try {
        let api = axios.create({
            baseURL: `${process.env.API_MOCKUP_BASE_URL}/${uri}/${process.env.API_MOCKUP_AIRPORT_KEY}`,
        })

        api.interceptors.request.use(config => {
            config.headers = {
                ...config.headers,
            };

            config.auth = {
                username: process.env.API_MOCKUP_AIRPORT_USERNAME,
                password: process.env.API_MOCKUP_AIRPORT_PASSWORD
            }

            return config;
        });

        return api

    } catch (error) {
        console.error(error)
    }
}