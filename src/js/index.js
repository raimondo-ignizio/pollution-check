import axios from "axios";
import "/src/css/style.css";
import green from "/src/img/icon/green-thumb.png";
import orange from "/src/img/icon/orange-thumb.png";
import red from "/src/img/icon/red-thumb.png";

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

async function callLambdaPollution(city) {
  try {
    const response = await axios.get("/.netlify/functions/getPollution", {
      params: {
        city: city
      }
    });
    console.log(response);
    let cityNameData = response.data.name;
    let cityAqi = response.data.aqi;
    resultParagraph.innerHTML = `The Air Pollution value in
                                ${cityNameData.italics()} is ${cityAqi.bold()}.`;
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
    alert("Your city is not present in the database. Try another city.");
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
    callLambdaPollution(city);
  } catch (err) {
    alert(err.message);
  }
};

async function callLambdaGeocoding(lat, long) {
  const response = await axios.get(".netlify/functions/reverseGeocoding", {
    params: {
      lat: lat,
      long: long
    }
  });
  let city = response.data.city;
  callLambdaPollution(city);
}

let geolocationSuccess = function(pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  callLambdaGeocoding(lat, long);
};

navigator.geolocation.getCurrentPosition(geolocationSuccess);

let cityForm = document.getElementById("city-selection");
cityForm.addEventListener ("submit", getCityInput);
