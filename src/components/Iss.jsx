import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import './Iss.css'; 
import emailjs from '@emailjs/browser';


const customIcon = L.icon({
    iconUrl: '/satellite.png',
    iconSize: [50, 50],
    iconAnchor: [13, 32],
    popupAnchor: [0, -32],
});

var templateParams = {
    to_name: 'Uzzal Bhowmik',
    from_name: "ISS Tracker Application",
    message: 'International Space Station: (ISS) is over your Bangladesh! Check Out!'
};


const Iss = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [countryCode, setCountryCode] = useState('');
    const [displayPath, setDisplayPath] = useState(true);
    const [centerOnISS, setCenterOnISS] = useState(true);

    const myMapRef = useRef(null);
    const myMarkerRef = useRef(null);
    const myCircleRef = useRef(null);
    const polyLinesRef = useRef(null);

    useEffect(() => {
        setupMap();
        updateISS();
        const interval = setInterval(updateISS, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (polyLinesRef.current && displayPath) {
            polyLinesRef.current.addTo(myMapRef.current);
        } else if (polyLinesRef.current && !displayPath) {
            polyLinesRef.current.remove();
        }
    }, [displayPath]);

    useEffect(() => {
        if (myMapRef.current && centerOnISS) {
            myMapRef.current.flyTo([latitude, longitude]);
        }
    }, [latitude, longitude, centerOnISS]);

    const setupMap = () => {
        if(myCircleRef.current != undefined) myMapRef.current.remove();
        myMapRef.current = L.map('ISSmap').setView([51.5074, -0.1278], 5);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/dark-v10',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic2lyZm91cmllciIsImEiOiJja2dheG93d28wYm0wMnpwZHd4eWc3MmFuIn0.zyjkFt9TN-jvU2isE28xrg',
        }).addTo(myMapRef.current);

        myMarkerRef.current = L.marker([0, 0], { icon: customIcon }).addTo(myMapRef.current).bindPopup(`<b>Live Tracking ISS!</b><br>Latitude: ${51.5074}<br>Longitude: ${-0.1278}`, { autoPan: false }).openPopup();

        myCircleRef.current = L.circle([0, 0], { color: 'teal', fillColor: '#22333b', fillOpacity: 0.5, radius: 10 }).addTo(myMapRef.current);
        polyLinesRef.current = L.polyline([], { color: 'teal'});
    };

    const updateISS = async () => {
        const { latitude, longitude } = await getISS();
        setLatitude(latitude);
        setLongitude(longitude);

        myMarkerRef.current.setLatLng([latitude, longitude]);
        myCircleRef.current.setLatLng([latitude, longitude]);

        const { country_code } = await getCountryData(latitude, longitude);
        setCountryCode(country_code);

        
        // send email based on country code
        if(country_code === "BD") {
            emailjs.send('service_eas9s49', 'template_h1rw4z2', templateParams, 'Dk4JoJ4-hCsSy2cCV')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                }, function (error) {
                    console.log('FAILED...', error);
                });
        }


        myMarkerRef.current.setPopupContent(
            `<b>Live Tracking the ISS!</b><br>Latitude: ${latitude}<br>Longitude: ${longitude}<br>Country Code: ${country_code === '??' ? 'Not A Country' : country_code
            } <br> <img className="gif" src="/space-station.gif" style="width: 50px; height: 50px; margin: 8px auto; display: block">`
        );

        polyLinesRef.current.addLatLng([latitude, longitude]);
    };

    const getISS = async () => {
        const ISS_API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
        const response = await fetch(ISS_API_URL);
        return await response.json();
    };

    const getCountryData = async (latitude, longitude) => {
        const countryData = await fetch(`https://api.wheretheiss.at/v1/coordinates/${latitude},${longitude}`);
        return await countryData.json();
    };

    const toggleFollowIss = () => {
        setCenterOnISS(!centerOnISS);
    };

    const togglePathLine = ()=> {
        setDisplayPath(!displayPath);
    }


    return (
        <div className="body">
            <div className=''>
                <h3 className="title fancy">International Space Station</h3>

                <div className="neumorphic-container">
                    <div id="ISSmap"></div>
                </div>

                <div className="activeText">
                    <p className="follow"><b className="be-active1 fw-bold text-wh">Follow ISS</b></p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="centerOnISS"
                            checked={centerOnISS}
                            onChange={toggleFollowIss}
                        />
                    </label>
                </div>

                <div className="activeText">
                    <p className="polyline"><b className="be-active fw-bold text-wh">Remove ISS polyline</b></p>
                    <label className="switch1">
                        <input
                            type="checkbox"
                            id="displayPath"
                            checked={displayPath}
                            onChange={togglePathLine}
                        />
                        <div className="indicator"></div>
                    </label>
                </div>

                <a
                    href="https://www.nasa.gov/mission_pages/station/main/index.html"
                    target="_blank" rel="noreferrer"
                >
                    <div className="about_iss">
                        <p className="iss_info fw-bold text-wh"><b>About ISS</b></p>
                        <img
                            className="nasa_logo"
                            src="data:image/png;base64,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"
                        />
                    </div>
                </a>

            </div>
        </div>
    );
};

export default Iss;
