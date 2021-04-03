const axios = require("axios");

exports.handler = async function (event, context) {
  const API_KEY = process.env.LOCATION_API_KEY;
  const lat = event.queryStringParameters.lat;
  const long = event.queryStringParameters.long;
  const response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${long}&format=json`);
  const city = response.data.address.city;

  return {
    statusCode: 200,
    body: city
  };
}
