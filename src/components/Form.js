import React from "react";
import { TweenLite } from 'gsap'
import "../form.css";

class Form extends React.Component {
    constructor(props){
      super(props);

      this.myElement = null;
      this.state={
        lat:undefined,
        lon:undefined
      };

      this.formValue=null;
      this.formPlaceholder="City";
      this.userLocation=undefined;
      this.lat=undefined;
      this.lon=undefined;
     }

    componentDidMount() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position)=> {
          this.userLocation=position;
          this.setState({
            lat:position.coords.latitude,
            lon:position.coords.longitude,
          });
        });
      } else {
      }
    }

    errorEntry(){
      this.myTween = TweenLite.fromTo(this.myElement, 1, {scale:1.5}, {scale:1},"=0");
      this.formPlaceholder="Invalid Entry";
      this.setState({
        formValue:"Invalid Entry"
      });
    }

    validEntry(){
      this.formPlaceholder="City";
      this.setState({
        formValue:"City"
      });
    }

  render(){
    return ( 
    <div className = "container" >
    <form onSubmit = { this.props.getWeather } >
        <div className = "col-md-4 offset-md-4" ref={div => this.myElement = div}>
        <input type = "text"
        name = "city"
        className = "form-control"
        placeholder = {this.formPlaceholder}
        />
        </div> 
        <div className = "col-md-4 offset-md-4" >
        <button name="search" className = "btn btn-default" >search red sky at night </button> 
        </div> 
    </form> 
      <form className="findMeForm" onSubmit = { this.props.getWeatherByCoords } > 
        <div className = "col-md-4 offset-md-4" >
        <input type = "hidden"
        name = "latLon"
        className = "form-control"
        placeholder = {this.state.lat}
        value = {`${this.state.lat},${this.state.lon}`}
        />
          <button name="geoSearch" className = "btn btn-default locationButton" >
          <svg version="1.1" x="0px" y="0px" viewBox="0 0 120 120">
            <path fill="white" d="M112.16,52.5h-7.6c-0.18,0-0.19-0.01-0.19-0.03c-3.17-18.82-18.01-33.66-36.83-36.83
              c-0.02,0-0.03-0.02-0.03-0.03V7.85c0-4.13-3.18-7.74-7.3-7.84c-4.23-0.11-7.7,3.29-7.7,7.5v8.1c0,0.02-0.01,0.03-0.03,0.03
              c-18.82,3.17-33.66,18.01-36.83,36.83c0,0.02-0.02,0.03-0.03,0.03l-7.76,0c-4.13,0-7.74,3.18-7.84,7.3c-0.11,4.23,3.29,7.7,7.5,7.7
              h8.1c0.02,0,0.03,0.01,0.03,0.03c3.17,18.82,18.01,33.66,36.83,36.83c0.02,0,0.03,0.02,0.03,0.03l0,7.76c0,4.13,3.18,7.74,7.3,7.84
              c4.23,0.11,7.7-3.29,7.7-7.5v-8.1c0-0.02,0.01-0.03,0.03-0.03c18.82-3.17,33.66-18.01,36.83-36.83c0-0.02,0.02-0.03,0.03-0.03h8.1
              c4.21,0,7.61-3.47,7.5-7.7C119.89,55.68,116.28,52.5,112.16,52.5z M67.5,91.62L67.5,91.62c-0.58,0.14-1.16,0.26-1.75,0.36
              c-0.05,0.01-0.1,0.02-0.14,0.03c-0.53,0.09-1.06,0.17-1.6,0.24c-0.1,0.01-0.2,0.03-0.3,0.04c-0.49,0.06-0.99,0.1-1.49,0.13
              c-0.13,0.01-0.26,0.02-0.38,0.03c-0.61,0.03-1.22,0.05-1.84,0.05s-1.23-0.02-1.84-0.05c-0.13-0.01-0.26-0.02-0.38-0.03
              c-0.5-0.03-1-0.08-1.49-0.13c-0.1-0.01-0.2-0.03-0.3-0.04c-0.54-0.07-1.07-0.14-1.6-0.24c-0.05-0.01-0.1-0.02-0.14-0.03
              c-0.59-0.11-1.17-0.23-1.75-0.36l0,0C40.58,88.8,31.2,79.42,28.38,67.5l0,0c-0.14-0.58-0.26-1.16-0.36-1.75
              c-0.01-0.05-0.02-0.1-0.03-0.14c-0.09-0.53-0.17-1.06-0.24-1.6c-0.01-0.1-0.03-0.2-0.04-0.3c-0.06-0.49-0.1-0.99-0.13-1.49
              c-0.01-0.13-0.02-0.26-0.03-0.38c-0.03-0.61-0.05-1.22-0.05-1.84s0.02-1.23,0.05-1.84c0.01-0.13,0.02-0.26,0.03-0.38
              c0.03-0.5,0.08-1,0.13-1.49c0.01-0.1,0.03-0.2,0.04-0.3c0.07-0.54,0.14-1.07,0.24-1.6c0.01-0.05,0.02-0.1,0.03-0.14
              c0.11-0.59,0.23-1.17,0.36-1.75l0,0c2.82-11.92,12.2-21.3,24.12-24.12l0,0c0.58-0.14,1.16-0.26,1.75-0.36
              c0.05-0.01,0.1-0.02,0.14-0.03c0.53-0.09,1.06-0.17,1.6-0.24c0.1-0.01,0.2-0.03,0.3-0.04c0.49-0.06,0.99-0.1,1.49-0.13
              c0.13-0.01,0.26-0.02,0.38-0.03c0.61-0.03,1.22-0.05,1.84-0.05s1.23,0.02,1.84,0.05c0.13,0.01,0.26,0.02,0.38,0.03
              c0.5,0.03,1,0.08,1.49,0.13c0.1,0.01,0.2,0.03,0.3,0.04c0.54,0.07,1.07,0.14,1.6,0.24c0.05,0.01,0.1,0.02,0.14,0.03
              c0.59,0.11,1.17,0.23,1.75,0.36l0,0c11.92,2.82,21.3,12.2,24.12,24.12l0,0c0.14,0.58,0.26,1.16,0.36,1.75
              c0.01,0.05,0.02,0.1,0.03,0.14c0.09,0.53,0.17,1.06,0.24,1.6c0.01,0.1,0.03,0.2,0.04,0.3c0.06,0.49,0.1,0.99,0.13,1.49
              c0.01,0.13,0.02,0.26,0.03,0.38c0.03,0.61,0.05,1.22,0.05,1.84s-0.02,1.23-0.05,1.84c-0.01,0.13-0.02,0.26-0.03,0.38
              c-0.03,0.5-0.08,1-0.13,1.49c-0.01,0.1-0.03,0.2-0.04,0.3c-0.07,0.54-0.14,1.07-0.24,1.6c-0.01,0.05-0.02,0.1-0.03,0.14
              c-0.11,0.59-0.23,1.17-0.36,1.75l0,0C88.8,79.42,79.42,88.8,67.5,91.62z"/>
            <circle fill="white" cx="60" cy="60" r="17.5"/>
          </svg>
          </button> 
          </div> 
      </form> 
    </div>
    );
    }
}

export default Form;