import axios from "axios";
import "./css/style.css";

async function callLambdaFunction(city) {
  const response = await axios.get("/.netlify/functions/getPollution");
  console.log(response);
  let cityNameData = response.data.data[0].station.name;
  let cityAqi = response.data.data[0].aqi;
  resultParagraph.innerHTML = `The Air Quality score in ${cityNameData.bold()} is ${cityAqi.bold()}.`;
}

let getCityInput = function() {
  let city = document.getElementById("city-field").value;
  console.log(city);
  callLambdaFunction(city);
  event.preventDefault();
};

let cityForm = document.getElementById("city-selection");
cityForm.addEventListener ("submit", getCityInput);
