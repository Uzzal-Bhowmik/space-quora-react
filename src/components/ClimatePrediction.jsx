import React, { useEffect, useState } from "react";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";
import "./ClimatePrediction.css";

// Initialize the boost module
HighchartsBoost(Highcharts);

const ClimatePrediction = ({ latitude, longitude, weatherData }) => {
  const [chartOptions, setChartOptions] = useState(null);
  const { name, sys, coord } = weatherData;
  console.log(weatherData);

  const fetchWeatherData = async () => {
    try {
      const apiUrl = `https://climate-api.open-meteo.com/v1/climate?latitude=${latitude}&longitude=${longitude}&start_date=2000-01-01&end_date=2050-12-31&daily=temperature_2m_max,pressure_msl_mean&models=CMCC_CM2_VHR4&min=2000-01-01&max=2050-12-31`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      // Extract the required data for the chart
      const { time, temperature_2m_max, pressure_msl_mean } = data.daily;

      // Prepare the series data for Highcharts
      const seriesData = time.map((date, index) => ({
        x: Date.parse(date),
        y: temperature_2m_max[index],
        pressure: pressure_msl_mean[index],
      }));

      // Configure the Highcharts options
      const options = {
        chart: {
          type: "line",
          zoomType: "x",
          events: {
            redraw() {
              this.showLoading();
              setTimeout(this.hideLoading.bind(this), 1500);
            },
          },
        },
        title: {
          text: `Climate Prediction Data`,
        },
        xAxis: {
          type: "datetime",
          labels: {
            format: "{value:%Y-%m-%d}",
          },
          min: Date.UTC(2020, 0, 1), // Set default zoom range start
          max: Date.UTC(2030, 11, 31),
        },
        yAxis: [
          {
            title: {
              text: "Temperature (°C)",
            },
          },
          {
            title: {
              text: "Pressure (hPa)",
            },
            opposite: true,
          },
        ],

        series: [
          {
            name: "Temperature",
            type: "spline",
            data: seriesData.map((item) => [item.x, item.y]),
            yAxis: 0,
            states: {
              hover: {
                enabled: true,
              },
              inactive: {
                opacity: 1,
              },
            },
          },
          {
            name: "Sea Level Pressure",
            type: "spline",
            data: seriesData.map((item) => [item.x, item.pressure]),
            yAxis: 1,
            states: {
              hover: {
                enabled: true,
              },
              inactive: {
                opacity: 1,
              },
            },
          },
        ],
        tooltip: {
          shared: true,
        },
      };

      setChartOptions(options);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [latitude, longitude]);

  const resetZoom = () => {
    if (chartOptions) {
      const xAxis = chartOptions.xAxis;
      xAxis.min = null; // Reset the min value
      xAxis.max = null; // Reset the max value

      setChartOptions({ ...chartOptions });
    }
  };

  return (
    <div className="prediction-chart">
      <div>
        <h1 className="text-center mb-5 fw-bolder">
          Climate <span>Forecast</span>
        </h1>
      </div>

      {chartOptions ? (
        <div className="">
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 text-muted">
              <span className="text-primary ms-3 d-block">
                * {name}, {sys.country}{" "}
                <img
                  src={`https://flagsapi.com/${sys.country}/flat/24.png`}
                  className="mb-1 me-3"
                ></img>
                (lat: {coord.lat}, long: {coord.lon})
              </span>
            </p>
            <button
              onClick={resetZoom}
              className="btn btn-outline-primary fw-bold px-4 py-2 ms-auto d-block my-3"
            >
              Back To Default
            </button>
          </div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      ) : (
        <p className="fs-2 fw-semibold text-center">Loading chart data...</p>
      )}
    </div>
  );
};

export default ClimatePrediction;
