import axios from "axios";
import "./css/style.css";
import green from "./img/icon/green-thumb.png";
import orange from "./img/icon/orange-thumb.png";
import red from "./img/icon/red-thumb.png";

let resultParagraph = document.getElementById("pollution-data");
let iconsContainer = document.getElementById("data-container");

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

async function callLambdaFunction(city) {
  try {
    const response = await axios.get("/.netlify/functions/getPollution", {
      params: {
        city: city
      }
    });
    console.log(response);
    let cityNameData = response.data.name;
    let cityAqi = response.data.aqi;
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
    callLambdaFunction(city);
  } catch (err) {
    alert(err.message);
  }
};

let cityForm = document.getElementById("city-selection");
cityForm.addEventListener ("submit", getCityInput);
