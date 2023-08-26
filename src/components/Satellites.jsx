import React, { useState, useEffect } from "react";
import "./Satellites.css";
import axios from "axios";
import SatelliteTracker from "./SatelliteTracker";
import { Spinner } from "react-bootstrap";

const Satellites = () => {
  const [tleData, setTleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSatelliteData = async () => {
      try {
        // Fetch TLE data from Celestrak API
        let response;
        if (!tleData.length) {
          response = await axios.get(
            "https://www.celestrak.com/NORAD/elements/stations.txt"
          );
        }

        const lines = response?.data.split("\n");

        const satelliteData = [];
        let currentSatellite = null;

        lines.forEach((line) => {
          if (line.trim() === "") return; // Skip empty lines

          // Lines 1 and 2 of TLE data
          if (!currentSatellite) {
            currentSatellite = { name: line.trim() };
          } else {
            if (!currentSatellite.line1) {
              currentSatellite.line1 = line.trim();
            } else {
              currentSatellite.line2 = line.trim();
              satelliteData.push(currentSatellite);
              currentSatellite = null;
            }
          }
        });

        // Filter selected satellites
        const randomSelectedSatellites = satelliteData.map(
          (st) =>
            satelliteData[Math.floor(Math.random() * satelliteData.length)]
        );
        const uniqueSatellites = [...new Set(randomSelectedSatellites)];
        const selectedTleData = uniqueSatellites.slice(0, 10);

        setTleData(selectedTleData);
      } catch (error) {
        console.error("Error fetching TLE data:", error);
      }
    };

    fetchSatelliteData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, [tleData]);

  return (
    <div className="satellites-container">
      {isLoading && (
        <div className="satellite-loader border">
          <h4 className="fw-bold mt-3">
            {" "}
            <Spinner
              variant="warning"
              animation="border"
              className="me-3"
            ></Spinner>
            Please Wait... Satellites are loading...
          </h4>
        </div>
      )}
      <SatelliteTracker satelliteData={tleData} />
    </div>
  );
};

export default Satellites;
