import "./ShowWeatherData.css";

const ShowWeatherData = ({ weatherData }) => {
    const kelvinToCelcius = kelvin => (kelvin - 273).toFixed();

    return (

        <div className="show-weather">
            <h1 className='text-center mb-4 fw-bolder'>Weather <span>Forecast</span></h1>

            <div className="weather-container">
                <div className="container">
                    <div className="top">
                        <div className="country">
                            <small>{weatherData?.sys.country}</small>
                            <img src={`https://flagsapi.com/${weatherData.sys.country}/flat/24.png`}></img>
                        </div>
                        <div className="location">
                            <p>{weatherData?.name}</p>
                        </div>
                        <div className="temp">
                            {weatherData.main ? <h1>{kelvinToCelcius(weatherData.main.temp)}°C</h1> : null}
                        </div>
                        <div className="description">
                            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
                        </div>
                    </div>

                    {weatherData.name !== null ? (
                        <div className="bottom">
                            <div className="feels">
                                {weatherData.main ? <p className='bold'>{kelvinToCelcius(weatherData.main.feels_like)}°C</p> : null}
                                <p>Feels Like</p>
                            </div>
                            <div className="humidity">
                                {weatherData.main ? <p className='bold'>{weatherData.main.humidity}%</p> : null}
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                {weatherData.wind ? <p className='bold'>{weatherData.wind.speed.toFixed()} MPH</p> : null}
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    ) : ""
                    }



                </div>
            </div>
        </div>
    );

};

export default ShowWeatherData;