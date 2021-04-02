import axios from "axios";
import "./css/style.css";
import green from "./img/icon/green-thumb.png";
import orange from "./img/icon/orange-thumb.png";
import red from "./img/icon/red-thumb.png";

let cityForm = document.getElementById("city-selection");
let resultParagraph = document.getElementById("pollution-data");
let iconsContainer = document.getElementById("icons-container");

let setIcon = function(color) {
  const icon = new Image();
  icon.src = color;
  icon.className = "result-icon";
  if (iconsContainer.hasChildNodes()) {
    iconsContainer.removeChild(iconsContainer.lastChild);
    iconsContainer.appendChild(icon);
  } else {
    iconsContainer.appendChild(icon);
  }
};



async function requestPollutionData(city) {
  const API_KEY = process.env.API_KEY;
  const result = await axios.get(`https://api.waqi.info/search/?token=${API_KEY}&keyword=${city}`);
  console.log(result);
  try {
    let cityNameData = result.data.data[0].station.name;
    let cityAqi = result.data.data[0].aqi;
    resultParagraph.innerHTML = `The Air Pollution score in ${cityNameData.bold()} is ${cityAqi.bold()}.`;
    switch (true) {
      case cityAqi < 99:
        setIcon(green);
        break;
      case cityAqi > 99 && cityAqi < 149:
        setIcon(orange);
        break;
      case cityAqi >149:
        setIcon(red);
        break;
    }
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
