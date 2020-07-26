import React from "react";
import "../App.css";
import TemperatureChart from "./TemperatureChart";
import FutureForecast from "./FutureForecast";
import { getIcon } from "../WeatherConditions";
import {kelvinToCelcius, getCardinalWindDirection, getWindBeaufortValue} from "../util"

const ReactFitText = require('react-fittext');

class Weather extends React.Component {
  nextDay = () =>{
    let forecastChartData = {
      labels: [],
      datasets: [
        {
          backgroundColor: 'rgba(255,255,255,1)',
          borderColor: 'transparent',
          borderWidth: 0,
          hoverBackgroundColor: 'rgba(255,255,255,1)',
          hoverBorderColor: 'transparent',
          data: []
        }
      ]
    };

    let nextDayArray=this.props.fiveDayForecast.slice(0,8);
    let dailyArrayLabels=[];
    let dailyArrayData=[];

    nextDayArray.forEach(weatherDataEntry=>{
      dailyArrayData.push((weatherDataEntry.main.temp-273.15).toFixed(1));
      dailyArrayLabels.push(weatherDataEntry.dt_txt.substr(11,5));
    });

    forecastChartData.labels=dailyArrayLabels;
    forecastChartData.datasets[0].data=dailyArrayData;
    return forecastChartData;
  }
  
  getDailyWeatherForecast(){
    let tempData=[];

    for(let day=1;day<6;day++){
      let weatherIcon = getIcon(this.props.fiveDayForecast[(day*8)-1].weather[0].icon);
      let tempDataElement=this.props.fiveDayForecast[(day*8)-1];
      tempDataElement.weatherIcon = weatherIcon;
      tempDataElement.key = day;
      tempData.push(tempDataElement);   
    }

    return tempData;
  }



  render() {
    let weatherIcon = getIcon(this.props.iconCode);

    return (
      <div className="container testclass" >
        <div className="cards pt-4">
            {this.props.city && (
              <ReactFitText maxFontSize={40}>
          <h1 id="locationHeader">
                {this.props.city},{this.props.country}
          </h1>
          </ReactFitText>
            )}

          {this.props.city && (
          <svg version="1.1" id="temperatureSVG" x="0px" y="0px" viewBox="0 0 400 400">


            <defs>
              <mask id="dataDisplay">
                <rect width="100%" height="100%" fill="white"/>
                  {weatherIcon.paths.map(function(pathElement, index){
                    return <path fill="black" key={index} d={pathElement}/>;
                  })}
                <text className="svgText locationTemperature" fontFamily="Major Mono Display" x="50%" y="42.5%" dominantBaseline="middle" textRendering="geometricPrecision">{kelvinToCelcius(this.props.currentTemperature.temp)}°C</text>
                <text className="svgText feelsLike" fontFamily="Major Mono Display" x="50%" y="57.5%" dominantBaseline="middle" textRendering="geometricPrecision">feels like {kelvinToCelcius(this.props.currentTemperature.feels_like)}°C</text>
              </mask>
            </defs>
            <circle id="svgTemperatureCircle" cx="200" cy="200" r="40%" fill="var(--color-light)"  mask="url(#dataDisplay)"/>
           </svg>
            )}
          
          {this.props.city && (
            <ReactFitText maxFontSize={18}>
              <h3 id="temperatureMinMax">
                {this.props.fiveDayForecast[0].weather[0].description}
              </h3>
            </ReactFitText>
          )}

          {this.props.city && (
            <ReactFitText maxFontSize={18}>
              <h3 id="temperatureMinMax">
          {getCardinalWindDirection(this.props.windDirection)} {getWindBeaufortValue(this.props.windSpeed.toFixed(1))} {this.props.windSpeed.toFixed(1)}m/s
              </h3>
            </ReactFitText>
          )}

          
          {this.props.city && (
            <ReactFitText maxFontSize={16}>
              <h3 id="temperatureMinMax">
                Hi {kelvinToCelcius(this.props.currentTemperature.temp_min)}°C || Lo {kelvinToCelcius(this.props.currentTemperature.temp_max)}°C
              </h3>
            </ReactFitText>
          )}

          {this.props.city && (
            <ReactFitText maxFontSize={16}>
              <h3 id="temperatureMinMax">
                {this.props.currentTemperature.humidity}% Humidity
              </h3>
            </ReactFitText>
          )}

          {this.props.fiveDayForecast && (
            <div id="tomorrowForecast">
              <ReactFitText maxFontSize={28}>
              <h3 id="temperatureMinMax">Next 24 hours</h3>
            </ReactFitText>
              <TemperatureChart fiveDayForecast = { this.props.fiveDayForecast }  chartData={ this.nextDay() }/>
            </div>
          )}
          {this.props.fiveDayForecast && (
            <div id="futureForecast">
              <FutureForecast fiveDayForecast = { this.props.fiveDayForecast } dailyWeather={ this.getDailyWeatherForecast() }/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Weather;
