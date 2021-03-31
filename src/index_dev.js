import axios from "axios";
import "./css/style.css";

let cityForm = document.getElementById("city-selection");
let resultParagraph = document.getElementById("pollution-data");

async function requestPollutionData(city) {
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`);
  console.log(result);
  let cityNameData = result.data.data[0].station.name;
  let cityAqi = result.data.data[0].aqi;
  resultParagraph.innerHTML = `The Air Quality score in ${cityNameData.bold()} is ${cityAqi.bold()}.`;
}

let getCityInput = function() {
  let city = document.getElementById("city-field").value;
  console.log(city);
  requestPollutionData(city);
  event.preventDefault();
};

cityForm.addEventListener ("submit", getCityInput);
