import axios from "axios";
import "./css/style.css";

let cityForm = document.getElementById("city-selection");
let city = cityForm.elements.city.value;

cityForm.onsubmit = async function requestPollutionData() {
  city = cityForm.elements.city.value;
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`https://api.waqi.info/feed/${city}/?token=${API_KEY}`);
  console.log(result);
}
