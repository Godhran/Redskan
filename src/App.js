import React from "react";
import "./App.css";
import Form from "./components/Form";
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';
// import TemperatureChart from "./components/TemperatureChart";

// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class App extends React.Component {
    state = {
        city: undefined,
        country: undefined,
        displayUnits: "F",
        fiveDayForecast: undefined,
        currentTemperature: undefined,
        timezone:undefined,
        sunrise: undefined,
        sunset: undefined,
        error: false,
    };

    toggleDisplayUnits() {
        this.state.displayUnits === "F" ?
            this.setState({
                displayUnits: "C",
            }) :
            this.setState({
                displayUnits: "F",
            });
    }

    getWeather = async(e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        // const country = e.target.elements.country.value;

        // const city = 'London';
        // const country = 'UK';
        const API_KEY = '1dedc0d2643278d9cb934bbd8235b5c6';

        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`
          // `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`
          // `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`
        );

        const data = await api_call.json();
        try {
            // alert(data);
            console.log(data);
            console.log(data.city.name);
            // if (city && country) {
              if (city) {
                this.setState({
                    // kelvinTemp: data.main.temp,
                    // tempMin: data.main.temp_min,
                    // tempMax: data.main.temp_max,
                    city: data.city.name,
                    country: data.city.country,
                    fiveDayForecast: data.list,
                    currentTemperature: data.list[0].main,
                    timezone: data.city.timezone,
                    sunrise: data.city.sunrise,
                    sunset: data.city.sunset,
                    // humidity: data.main.humidity,
                    // description: data.weather[0].description,
                    // pressure: data.main.pressure,
                    // unit: data.main.temp,
                    error: false,
                    // icon: data.weather[0].icon,
                });
            } else {
                this.setState({
                    // kelvinTemp: undefined,
                    // tempMin: undefined,
                    // tempMax: undefined,
                    city: undefined,
                    country: undefined,
                    fiveDayForecast: undefined,
                    currentTemperature: undefined,
                    timezone:undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    // humidity: undefined,
                    // description: undefined,
                    // pressure: undefined,
                    // unit: undefined,
                    // icon: undefined,
                    error: "Please Enter Correct Values",
                });
            }
        } catch (error) {
            alert("Sorry, try again!");
        }
    };

    render() {
        return ( 
        <div className = "App" >
          <Form getWeather = { this.getWeather }/> 
          <Weather
            city = { this.state.city }
            currentTemperature={ this.state.currentTemperature }
            country = { this.state.country }
            timeData = { {timezone:this.state.time,sunrise:this.state.sunrise,sunset:this.state.sunset}}
            displayUnits = { this.state.displayUnits }
            clickHandler = { this.toggleDisplayUnits.bind(this) }
            fiveDayForecast = { this.state.fiveDayForecast }
            error = { this.state.error }/>
        </div>
        );
    }
}

export default App;