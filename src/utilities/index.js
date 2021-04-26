const moment = require('moment')

function getDistanceFromLatLonInKm(pointA = {lat: '', lon: ''}, pointB = {lat: '', lon: ''}) {
  const raio = 6371; // Raio da Terra em KM
  let dLat = deg2rad(pointB.lat - pointA.lat);
  let dLon = deg2rad(pointB.lat - pointA.lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(pointA.lat)) * Math.cos(deg2rad(pointB.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distancia = raio * c; // Distance em KM

  // Converte o número em graus ao equivalente em radianos
  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  return Math.round(distancia);
}

function calculateAverageSpeed(hours, distance) {
  return Math.round(distance / hours)
}

function calculatepricePerFare(price, distance) {
  return (price / distance).toFixed(2)
}

function calculateFlightDurationInHours(start, end) {
  let departureTime = moment(start);
  let arrivalTime = moment(end)
  const duration = moment.duration(arrivalTime.diff(departureTime));
  return duration.asHours()
}

module.exports ={
  calculateAverageSpeed,
  calculatepricePerFare,
  getDistanceFromLatLonInKm,
  calculateFlightDurationInHours
}
