"use strict";

const temperatureCelsius = 10;
const windSpeedKmh = 5;

function calculateWindChill(temperature, windSpeed) {
  return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

const windChillElement = document.querySelector("#wind-chill");
const isWindChillApplicable = temperatureCelsius <= 10 && windSpeedKmh > 4.8;

if (isWindChillApplicable) {
  windChillElement.textContent = `${calculateWindChill(temperatureCelsius, windSpeedKmh).toFixed(1)} °C`;
} else {
  windChillElement.textContent = "N/A";
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
const modified = new Date(document.lastModified);
document.querySelector("#last-modified").dateTime = modified.toISOString();
document.querySelector("#last-modified").textContent = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit", month: "2-digit", year: "numeric",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
}).format(modified).replace(",", "");
