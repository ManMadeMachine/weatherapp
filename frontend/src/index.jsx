import React, { useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    console.log(`Fetching from URL: ${baseURL}/weather`);
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
    return {err: error};
  }
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch(error) {
    console.error(error);
  }
}

const getForecastFromApiWithLocation = async (lat, lon) => {
  try {
    // TODO: Check if there's a nicer way to fetch with URL params
    console.log(`Calling ${baseURL}/forecast/${lat}/${lon}`);
    const response = await fetch(`${baseURL}/forecast/${lat}/${lon}`);
    return response.json();
  } catch(error) {
    console.error(error);
  }
}

const handleForeCastResponse = () => {
  //TODO: Handle response in here either way
}

class Forecast extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        forecast: []
      };
    }

    // First maybe 
    async componentDidMount(){
      navigator.geolocation.getCurrentPosition(async (pos) => {
        console.log("Position: ", pos)
        const response = await getForecastFromApiWithLocation(pos.coords.latitude, pos.coords.longitude);

        // TODO: Handle the response in the method above
        if (response.err){
          this.setState({err: "Error: " + response.err.message});
        } else{
          console.log(response);
          this.setState({forecast: response});
        }

      }, async (err) => {
        // Fall back to Helsinki, FI
        const response = await getForecastFromApi();

        if (response.err){
          this.setState({err: "Error: " + response.err.message});
        } else{
          console.log(response);
          this.setState({forecast: response});
        }
      }, {
        enableHighAccyracy: true,
        timeout: 5000,
        maximumAge: 0
      });

    }

    render(){
      const { forecast } = this.state
      console.log("Forecast: ", forecast)
      return (
        <div>
          <h3>Forecast for the next 5 hours</h3>
          <div className="forecast">
            {forecast.map((f, index) => {
              console.log("F: ", f.weather[0].icon.slice(0, -1));
              return (
                <div className="icon_small" key={index}>
                  <img src={`/img/${f.weather[0].icon.slice(0, -1)}.svg`} />
                </div>);
            })}
          </div>
        </div>
      );
    }
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      err: ""
    };
  }

  async componentDidMount() {
    const response = await getWeatherFromApi();

    console.log("Weather icon name: " + response.icon);
    if (response.err){
      this.setState({err: "Error: " + response.err.message});
    } else{
      this.setState({icon: response.icon.slice(0, -1)});
    }
  }

  render() {
    const { icon, err} = this.state;
    return (
      <div>
      {err && 
        <div className="error">
          <p>{err}</p>
        </div>
      }
        <div>
          <div className="icon">
            { icon && <img src={`/img/${icon}.svg`} /> }
          </div>
          <Forecast />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
