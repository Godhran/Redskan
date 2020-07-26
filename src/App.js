import React from "react";
import "./App.css";
import Form from "./components/Form";
import Weather from "./components/Weather";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        icon: undefined,
        windSpeed:undefined,
        windDirection:undefined,
    };

    constructor(props) {
      super(props)
      this.formChild = React.createRef();
    }
    
    getWeather = async(e) => {
      e.preventDefault();
      const city = e.target.elements.city.value;
      if(city.length>0){
        const API_KEY = 'NOPE';

        const api_call = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`
        );

        const data = await api_call.json();
        try {
              if (city) {
                this.setState({
                    city: data.city.name,
                    country: data.city.country,
                    fiveDayForecast: data.list,
                    currentTemperature: data.list[0].main,
                    timezone: data.city.timezone,
                    sunrise: data.city.sunrise,
                    sunset: data.city.sunset,
                    windSpeed:data.list[0].wind.speed,
                    windDirection:data.list[0].wind.deg,
                    error: false,
                    icon: data.list[0].weather[0].icon
                });
            this.formChild.current.validEntry();
            } else {
                this.setState({
                    city: undefined,
                    country: undefined,
                    fiveDayForecast: undefined,
                    currentTemperature: undefined,
                    timezone:undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    icon: undefined,
                    windSpeed:undefined,
                    windDirection:undefined
                });
            }
        } catch (error) {
            this.formChild.current.errorEntry();
        }
     }else{
      this.setState({
        city: undefined,
        country: undefined,
        fiveDayForecast: undefined,
        currentTemperature: undefined,
        timezone:undefined,
        sunrise: undefined,
        sunset: undefined,
        icon: undefined,
        windSpeed:undefined,
        windDirection:undefined
      });
     }
  };

  
  getWeatherByCoords = async(e) => {
    e.preventDefault();
    const lat = e.target.elements.latLon.value.split(",")[0];
    const lon = e.target.elements.latLon.value.split(",")[1];

    const API_KEY = '1dedc0d2643278d9cb934bbd8235b5c6';

    const api_call = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const data = await api_call.json();
    try {
        if (lat) {
          this.setState({
              city: data.city.name,
              country: data.city.country,
              fiveDayForecast: data.list,
              currentTemperature: data.list[0].main,
              timezone: data.city.timezone,
              sunrise: data.city.sunrise,
              sunset: data.city.sunset,
              windSpeed:data.list[0].wind.speed,
              windDirection:data.list[0].wind.deg,
              error: false,
              icon: data.list[0].weather[0].icon
          });
      this.formChild.current.validEntry();
      } else {
          this.setState({
              city: undefined,
              country: undefined,
              fiveDayForecast: undefined,
              currentTemperature: undefined,
              timezone:undefined,
              sunrise: undefined,
              sunset: undefined,
              icon: undefined,
              windSpeed:undefined,
              windDirection:undefined
          });
      }
  } catch (error) {
      this.formChild.current.errorEntry();
  }
};

    render() {
        return ( 
        <div className="App"  id="App">
        <Form getWeather = { this.getWeather } getWeatherByCoords = { this.getWeatherByCoords } ref={this.formChild}/> 
          <Weather
            city = { this.state.city }
            currentTemperature={ this.state.currentTemperature }
            country = { this.state.country }
            timeData = { {timezone:this.state.time,sunrise:this.state.sunrise,sunset:this.state.sunset}}
            displayUnits = { this.state.displayUnits }
            fiveDayForecast = { this.state.fiveDayForecast }
            iconCode = { this.state.icon}
            windSpeed = { this.state.windSpeed}
            windDirection = { this.state.windDirection}
            updateCSS = {this.updateCSSClass}/>
        </div>
        );
    }
}

export default App;