import React from "react";
import "../App.css";
import { kelvinToCelcius } from "../util"

class Weather extends React.Component {

   getFormattedDate(timestamp){
    let weekdays=['Sunday','Monday','Tuesday','Wednesay','Thursday','Friday','Saturday'];
    var tempDate = new Date();
    tempDate.setTime(timestamp*1000);
    return weekdays[tempDate.getDay()];
   }

    render() {
        return ( 
          <div>
            
          <svg version="1.1" id="temperatureSVG" x="0px" y="0px" viewBox="0 0 400 400">
          <text className="svgTextDisplay" fontFamily="Major Mono Display" x="50%" y="10%" dominantBaseline="middle" textRendering="geometricPrecision">this time || this week</text>
            
      
      {(this.props.dailyWeather || []).map(item => (
            <g key={item.key}>{item.key}
            <g transform={`scale(0.45 0.45) translate(-125 ${-185+(item.key*130)})`}>
            {item.weatherIcon.paths.map(function(pathElement, index){
                    return <path fill="white" key={index} d={pathElement}/>;
                  })}
            </g>
            <text className="svgTextForecast" fontFamily="Major Mono Display" x="37.5%" y={(item.key*60)+50} dominantBaseline="middle" textRendering="geometricPrecision">{item.weather[0].description}</text>
            <text className="svgTextForecast" fontFamily="Major Mono Display" x="20%" y={(item.key*60)+50} dominantBaseline="middle" textRendering="geometricPrecision">{this.getFormattedDate(item.dt).substr(0,3)}</text>
            <text className="svgTextForecastTemperature" fontFamily="Major Mono Display" x="100%" y={(item.key*60)+50} dominantBaseline="middle" textRendering="geometricPrecision">{kelvinToCelcius(item.main.temp)}°c</text>
            </g>
            ))}
            </svg>
          </div>
        );
    }
}

export default Weather;