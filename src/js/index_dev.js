import axios from "axios"

async function requestPollutionData() {
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`/feed/${city}/?token=${API_KEY}`);
  console.log(result);
}

requestPollutionData();
