import axios from "axios";
import "./css/style.css";

let resultParagraph = document.getElementById("pollution-data");

async function callLambdaFunction(city) {
  const response = await axios.get("/.netlify/functions/getPollution", {
    params: {
      city: city
    }
  });
  console.log(response);
  let cityNameData = response.data.name;
  let cityAqi = response.data.aqi;
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
