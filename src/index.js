import axios from "axios";
import "./css/style.css";

async function callLambdaFunction() {
  const response = await axios.get("/.netlify/functions/getPollution");
  console.log(response);
}

callLambdaFunction();
