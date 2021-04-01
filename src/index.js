import axios from "axios";
import "./css/style.css";

let resultParagraph = document.getElementById("pollution-data");

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
    callLambdaFunction(city);
  } catch (err) {
    alert(err.message);
  }
};

let cityForm = document.getElementById("city-selection");
cityForm.addEventListener ("submit", getCityInput);
