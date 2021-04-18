import dotenv from 'dotenv'
import axios from "axios";

dotenv.config()

start()

async function start() {
    const airportsCombination = await getCombinationAirPort()
    const flights = await getScheduledFlights(airportsCombination)

}

async function getScheduledFlights(airportsCombination = []) {
    for (const combination of airportsCombination) {

        for (const airport of combination) {
            // const { data } = fetchMockupAirPort('search').get(`${airport.}`)
        }

    }
}

async function getCombinationAirPort() {
    try {
        const { data } = await fetchMockupAirPort('airports').get()

        const airports = convertObjectToArray(data)
        const combinationsAirPorts = permutations(airports.slice(0, 2))

        return combinationsAirPorts;

    } catch (error) {
        console.log(error)
    }
}

function permutations(airports) {
    let result = [];

    if (airports.length === 0) {
        result.push([]);
    } else {

        for (var i = 0; i < airports.length; i++) {
            let firstAirport = airports[i];
            let otherAirport = airports.slice(0, i).concat(airports.slice(i + 1));
            let otherPermutations = permutations(otherAirport);

            for (var j = 0; j < otherPermutations.length; j++) {
                result.push([firstAirport].concat(otherPermutations[j]));
            }
        }
    }
    return result;
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

function fetchMockupAirPort(uri) {
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