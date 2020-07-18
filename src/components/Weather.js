import React from "react";
import "../App.css";
import TemperatureChart from "./TemperatureChart";

class Weather extends React.Component {

  // colourTimes=[{time:"dusk",stopOne:"var(--color-primary)",stopTwo:"var(--color-dark)"},{time:"night",stopOne:"var(--color-dark)",stopTwo:"var(--color-dark)"}];
  // currentColour = this.colourTimes[0];
  
  constructor(props) {
    super(props);
    this.state = { 
      timeOfDayDetected:false 
      };
  }

  handleClicked() {
    this.props.clickHandler();
  }

  kelvinToCelcius = (temperature) =>{
    return (temperature-273.15).toFixed(0);
  }

  convertDate =  () =>{
console.log(this.timeOfDayDetected)
this.state.timeOfDayDetected=true;
console.log(this.timeOfDayDetected)
  }
  
  onClick =()=>{
    console.log("Boo");
    // this.state.timeOfDayDetected=this.state.timeOfDayDetected?false:true;
    const currentState = this.state.timeOfDayDetected;
    this.setState({ timeOfDayDetected: !currentState });
    // console.log(this.state.timeOfDayDetected);
  }

  render() {
    // if(this.props.timeData.sunrise){
    //   let currentTime = new Date().getTime();
    //   console.log(currentTime);
    //   console.log(this.props.timeData.sunrise);
    //   console.log(currentTime-(this.props.timeData.sunrise*1000));
    //   console.log(this.convertDate());
    // }
    let testStopClassOne='sunriseStopOne';
    let testStopClassTwo='defaultStopOne';
    let testTextClass='nightText';

    return (
      <div className="container">
        <div className="cards pt-4">
            {this.props.city && (
          <h1 id="locationHeader">
                {this.props.city},{this.props.country}
          </h1>
            )}

          {this.props.city && (
          <svg version="1.1" id="temperatureSVG" x="0px" y="0px" viewBox="0 0 400 400" onClick={this.onClick}>
            {/* <mask id="temperatureTextMask">
              <text className="svgText locationTemperature" x="50%" y="42.5%" dominantBaseline="middle" textRendering="geometricPrecision">{this.kelvinToCelcius(this.props.currentTemperature.temp)}°C</text>
              <text className="svgText feelsLike" x="50%" y="57.5%" dominantBaseline="middle" textRendering="geometricPrecision">feels like {this.kelvinToCelcius(this.props.currentTemperature.feels_like)}°C</text>
            </mask>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop className={`${this.state.timeOfDayDetected ? "nightStopTwo" : testStopClassOne+ " nightStopTwo"}`} offset="0%" />
              <stop className={`${this.state.timeOfDayDetected ? "nightStopTwo" : testStopClassTwo+ " nightStopTwo"}`} offset="100%" />
            </linearGradient> */}
            <circle id="svgTemperatureCircle" cx="200" cy="200" r="40%" fill="var(--color-light)" />
            <text className="svgText locationTemperature" x="50%" y="42.5%" dominantBaseline="middle" textRendering="geometricPrecision">{this.kelvinToCelcius(this.props.currentTemperature.temp)}°C</text>
            <text className="svgText feelsLike" x="50%" y="57.5%" dominantBaseline="middle" textRendering="geometricPrecision">feels like {this.kelvinToCelcius(this.props.currentTemperature.feels_like)}°C</text>
          </svg>
            )}

          {this.props.city && (
            <h3 id="temperatureMinMax" className={`${this.state.timeOfDayDetected ? testTextClass : ""}`}>
            Hi {this.kelvinToCelcius(this.props.currentTemperature.temp_min)}°C  | Lo {this.kelvinToCelcius(this.props.currentTemperature.temp_max)}°C
            </h3>
          )}

          <h1 className="py-2">
            {this.props.kelvinTemp && (
              <p>
                <i className="fas fa-thermometer-three-quarters"></i>{" "}
                <span onClick={this.handleClicked.bind(this)}>
                  {this.calculateTemp(
                    this.props.kelvinTemp,
                    this.props.displayUnits
                  )}
                  &deg;
                  {this.props.displayUnits}
                </span>
              </p>
            )}
          </h1><br></br>
          <h4 className="py-6">
            {this.props.description && (
              <p>
                {" "}
                <i className="fas fa-info"></i>{" "}
                <span>{this.props.description}</span>
              </p>
            )}
          </h4>
          <h4 className="py-3">
            {this.props.tempMin && this.props.tempMax && (
              <p>
                {" "}
                <i className="fas fa-sort"></i> Min/Max:{" "}
                <span onClick={this.handleClicked.bind(this)}>
                  {this.calculateTemp(
                    this.props.tempMin,
                    this.props.displayUnits
                  )}
                  &deg;{this.props.displayUnits} |
                  {this.calculateTemp(
                    this.props.tempMax,
                    this.props.displayUnits
                  )}
                  &deg;
                  {this.props.displayUnits}
                </span>
              </p>
            )}
          </h4>
          <h4 className="py-4">
            {this.props.humidity && (
              <p>
                {" "}
                <i className="fas fa-water"></i> Humidity:{" "}
                <span>{this.props.humidity}%</span>
              </p>
            )}
          </h4>
          <h4 className="py-5">
            {this.props.pressure && (
              <p>
                {" "}
                <i className="fas fa-tachometer-alt"></i> Pressure:{" "}
                <span>{this.props.pressure} hPa</span>
              </p>
            )}
          </h4>
          <h4>
            {this.props.error && (
              <p>
                {" "}
                <i></i> <span>{this.props.error}</span>
              </p>
            )}
          </h4>
          {/* {this.props.fiveDayForecast && (
            <TemperatureChart fiveDayForecast = { this.props.fiveDayForecast } />
          )} */}
        </div>
      </div>
    );
  }
}

export default Weather;
