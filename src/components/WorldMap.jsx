import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "/marker-icon.png";
import markerIconRetina from "/marker-icon-2x.png";
import markerShadow from "/marker-shadow.png";
import ClimatePredictionChart from "./ClimatePrediction";
import "./WorldMap.css";
import ShowWeatherData from "./showWeatherData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

const WorldMap = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  let map;

  useEffect(() => {
    // Create the map instance and set the view
    // if(map != undefined) map.remove();
    map = L.map("map").setView([0, 0], 3);

    // Set up default marker icon
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIconRetina,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    // Add the tile layer (e.g., OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      subdomains: ["a", "b", "c"],
    }).addTo(map);

    const marker = L.marker([0, 0]).addTo(map);
    const tooltip = L.tooltip({
      className: "custom-tooltip",
      opacity: 0.7,
      permanent: true,
    })
      .setLatLng([0, 0])
      .addTo(map);

    map.on("mousemove", (e) => {
      const { lat, lng } = e.latlng;

      marker.setLatLng([lat, lng]);
      tooltip.setLatLng([lat, lng]);
      tooltip.setContent(
        `Latitude: ${lat.toFixed(4)}, Longitude: ${lng.toFixed(4)}`
      );
    });

    // Clean up the map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation({
      lat,
      lng,
    });

    // fetching data from openweather
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=844c5daffe2ef5207080d33dd4571d23`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        console.error("Error fetching weather data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    {
      weatherData &&
        toast.success(
          `Searching for: ${weatherData?.name}, ${weatherData?.sys?.country}`
        );
    }
  }, [weatherData]);

  useEffect(() => {
    if (map) {
      map.on("click", handleMapClick);
    }
    return () => {
      if (map) {
        map.off("click", handleMapClick);
      }
    };
  }, [map]);

  return (
    <div>
      <div className="map-container">
        <div
          id="map"
          className="worldmap animate__animated animate__zoomIn animate__slow"
        ></div>
        <ToastContainer />
      </div>

      {/* showing weather data */}
      {weatherData && <ShowWeatherData weatherData={weatherData} />}

      {/* showing climate chart */}
      {selectedLocation && weatherData && (
        <ClimatePredictionChart
          weatherData={weatherData}
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lng}
        />
      )}
    </div>
  );
};

export default WorldMap;
