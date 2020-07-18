import React from 'react';
import {
  XYPlot,
  XAxis,
  VerticalBarSeries,
} from 'react-vis';


export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        index: null, preparedData:[] };
    this.formatForecast();
  }
  formatForecast = () =>{
    let dailyArray=[];
    this.props.fiveDayForecast.forEach(function(weatherDataEntry) {
        if(weatherDataEntry.dt_txt.substr(8,2)==="19"){
            // Get HH:MM & Temperature in Celcius from Kelvin
            dailyArray.push({x: weatherDataEntry.dt_txt.substr(11,5), y:  weatherDataEntry.main.temp-273.15});
            console.log(dailyArray);
        }
    });
    this.state.preparedData=dailyArray;
  }

  render() {
    const { index } = this.state;
    // const dataWithColor = this.state.preparedData.map((d, i) => ({...d, color: Number(i !== index)}));
    const colourisedData = this.state.preparedData.map(d => {
                            let color = '#125C77';
                            // if (d.hour === selectedHour) {
                            // color = '#19CDD7';
                            // }
                            // if (d.hour === highlightedHour) {
                            // color = '#17B8BE';
                            // }
                            return {...d, color};
                        });
    return (
      <div>
        <XYPlot xType="ordinal" width={700} height={300} xDistance={20} onMouseLeave={() => this.setState({ index: null })}>
          <XAxis />
          <VerticalBarSeries className="vertical-bar-series-example" data={colourisedData} animation onNearestX={(d, { index }) => this.setState({ index })} />
        </XYPlot>
      </div>
    );
  }
}