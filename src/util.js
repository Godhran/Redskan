export function getCardinalWindDirection(angle) {

    const degreePerDirection = 360 / 8;

    const offsetAngle = angle + degreePerDirection / 2;

    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "Northern" :
        (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "North eastern" :
        (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "Eastern" :
        (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "South Eastern" :
        (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "South" :
        (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "South West" :
        (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "West" :
        "North West";
}

export function getWindBeaufortValue(windSpeed) {

    return (windSpeed >= 0 && windSpeed < 0.8) ? "Calm" :
        (windSpeed >= 0.8 && windSpeed < 2.4) ? "Light Air" :
        (windSpeed >= 2.4 && windSpeed < 4.3) ? "Light Breeze" :
        (windSpeed >= 4.3 && windSpeed < 6.7) ? "Gentle Breeze" :
        (windSpeed >= 6.7 && windSpeed < 9.3) ? "Moderate Breeze" :
        (windSpeed >= 9.3 && windSpeed < 12.3) ? "Fresh Breeze" :
        (windSpeed >= 12.3 && windSpeed < 15.5) ? "Strong Breeze" :
        (windSpeed >= 15.5 && windSpeed < 18.6) ? "Near Gale" :
        (windSpeed >= 18.9 && windSpeed < 22.6) ? "Gale" :
        (windSpeed >= 22.6 && windSpeed < 26.4) ? "Strong Gale" :
        (windSpeed >= 26.4 && windSpeed < 30.5) ? "Storm" :
        (windSpeed >= 30.5 && windSpeed < 32.7) ? "Violent Storm" : "Hurricane";
}

export function kelvinToCelcius(temperature) {
    return (temperature - 273.15).toFixed(0);
}

export function celciusToFahrenheit(temperature) {
    return ((temperature * 1.8) + 32).toFixed(0);
}

export function fahrenheitToCelcius(temperature) {
    return ((temperature - 32) / 1.8).toFixed(0);
}