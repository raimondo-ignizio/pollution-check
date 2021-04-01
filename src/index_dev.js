import axios from "axios";
import "./css/style.css";

let cityForm = document.getElementById("city-selection");
let resultParagraph = document.getElementById("pollution-data");

async function requestPollutionData(city) {
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`);
  console.log(result);
  try {
    let cityNameData = result.data.data[0].station.name;
    let cityAqi = result.data.data[0].aqi;
    resultParagraph.innerHTML = `The Air Quality score in ${cityNameData.bold()} is ${cityAqi.bold()}.`;
  } catch {
    alert("City not found in database. Try another city.");
  }
}

let getCityInput = function() {
  try {
    event.preventDefault();
    let city = document.getElementById("city-field").value;

    if (city.length == 0) {
      throw new SyntaxError("The form must contain a name.");
    }

    console.log(city);
    requestPollutionData(city);
  } catch (err) {
    alert(err.message);
  }
};

cityForm.addEventListener ("submit", getCityInput);
