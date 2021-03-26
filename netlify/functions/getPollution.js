const axios = require("axios");

exports.handler = async event => {
  const API_KEY = process.env.API_KEY;
  const response = await axios.get(`/feed/${city}/?token=${API_KEY}`);

  const pass = (body) => {
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  }

  return pass(response);
}
