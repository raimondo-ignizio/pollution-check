import axios from "axios"

async function callLambdaFunction() {
  const response = await axios.get("/.netlify/functions/getPollution");
  console.log(response);
}

callLambdaFunction();
