import React from 'react';
import {Bar} from 'react-chartjs-2';

export default class Example extends React.Component {

  render() {
    return (
        <div id="forecastContainer">
        <Bar
          data={this.props.chartData}
          width={100}
          // height={350}
          redraw
          options={{
            maintainAspectRatio: false,
            legend: false,
            layout: {
              padding: {
                top: 70,
              },
            },
            tooltips: {
                custom: function(tooltip) {
                  if (!tooltip) return;
                  // disable displaying the color box;
                  tooltip.displayColors = false;
                },
                callbacks: {
                    title: function(tooltipItem, data) {
                      return data['labels'][tooltipItem[0]['index']];
                    },
                    label: function(tooltipItem, data) {
                        return tooltipItem.value+"°c";
                    },
                },
                yAlign: 'bottom',
                backgroundColor: '#475C7A',
                titleFontFamily:'Major Mono Display',
                titleFontSize: 20,
                titleFontColor: 'white',
                titleAlign:'center',
                bodyFontColor: 'white',
                bodyFontFamily:'Major Mono Display',
                bodyAlign:'center',
                bodyFontSize: 16
              },
            scales: {
                xAxes: [{
                    ticks:{
                        fontColor:'white',
                        fontFamily:'Major Mono Display',
                        fontStyle:'bolder'
                    },
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                    ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return value+"°c";
                      },
                        beginAtZero: true,
                        fontColor: 'white',
                        fontFamily:'Major Mono Display',
                        fontStyle:'bolder'
                    },
                  gridLines: {
                    color:'rgba(255,255,255,0.5)',
                    zeroLineColor: 'rgba(255,255,255,0.5)'
                  }
                }]
              }
          }}
        />
      </div>
    );
  }
}