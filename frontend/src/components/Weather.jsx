import React from 'react';
import Forecast from './Forecast';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    console.log(`Fetching from URL: ${baseURL}/weather`);
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentDidMount() {
    const response = await getWeatherFromApi();

    if (response.err) {
      console.error(`Error: ${response.err.message}`);
    } else {
      this.setState({ icon: response.icon.slice(0, -1) });
    }
  }

  render() {
    const { icon } = this.state;
    return (
      <div>
        <div>
          <div className="icon">
            { icon && <img alt="weather_icon" src={`/img/${icon}.svg`} /> }
          </div>
          <Forecast />
        </div>
      </div>
    );
  }
}

export default Weather;
