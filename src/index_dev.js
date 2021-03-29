import axios from "axios";
import "./css/style.css";

async function requestPollutionData() {
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  console.log(result);
}

let getCityInput = function () {
  event.preventDefault();
  let city = document.getElementById("city-field").value;
  console.log(city);
  requestPollutionData();
}
