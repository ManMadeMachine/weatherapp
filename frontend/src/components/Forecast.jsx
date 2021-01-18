/* global navigator */

import React from 'react';

const baseURL = process.env.ENDPOINT;

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

const getForecastFromApiWithLocation = async (lat, lon) => {
  try {
    // Using axios etc, this request would look a lot nicer, but this works.
    const response = await fetch(`${baseURL}/forecast/${lat}/${lon}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      forecast: [],
    };
  }

  async componentDidMount() {
    // If the user has allowed location in browser, use that.
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const response = await getForecastFromApiWithLocation(
        pos.coords.latitude,
        pos.coords.longitude,
      );

      this.setState({ forecast: response });
    }, async () => {
      // Fall back to Helsinki, FI
      const response = await getForecastFromApi();
      this.setState({ forecast: response });
    }, {
      enableHighAccyracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  }

  render() {
    const { forecast } = this.state;
    return (
      <div>
        <h3>Forecast for the next 5 hours</h3>
        <div className="forecast">
          {forecast.map((f, index) => (
            // Using index is not a good practise, but there wasn't any proper ID to use
            // or at least I didn't notice any. This is kind of a last resort.
            <div className="icon_small" key={index}>
              <img alt="weather_icon_small" src={`/img/${f.weather[0].icon.slice(0, -1)}.svg`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Forecast;
