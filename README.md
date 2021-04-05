# pollution-check
An app for the JavaScript Advanced Project on Start2Impact.

## Description
This application allows the user to see the air quality in their location (or a desired one, writible in the form) through the AICQN API.
To try it [click here](https://pollutioncheck.netlify.app/).

## What I used
- Webpack
- Dotenv
- Axios
- Netlify (for deploy)
- AICQN API

## Usage
The application will initially try to get the user's location and display its air quality if available, if the air monitoring it's not available in the user's location it shows the data from the nearest station to the user's coordinates, then the app will also accept a manually specified location.
