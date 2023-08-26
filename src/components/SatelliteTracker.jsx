// SatelliteTracker.js
import React, { useEffect } from "react";
import WorldWind from "@nasaworldwind/worldwind";
import SGP4 from "sgp4";
import "./SatelliteTracker.css";

const SatelliteTracker = ({ satelliteData }) => {
  useEffect(() => {
    // const satelliteData = [
    //   {
    //     name: "ISS (ZARYA)",
    //     line1:
    //       "1 25544U 98067A   23235.51284918  .00014007  00000+0  25659-3 0  9994",
    //     line2:
    //       "2 25544  51.6426 355.0105 0003727 342.0009 113.8232 15.49590945412235",
    //   },

    //   {
    //     name: "ISS DEB",
    //     line1:
    //       "1 47853U 98067RZ  23234.51760461  .00037446  00000+0  28228-3 0  9999",
    //     line2:
    //       "2 47853  51.6363 320.1330 0000899  24.7515 335.3527 15.72114090139231",
    //   },
    //   {
    //     name: "SOYUZ-MS 23",
    //     line1:
    //       "1 55688U 23024A   23235.51284918  .00014007  00000+0  25659-3 0  9997",
    //     line2:
    //       "2 55688  51.6426 355.0105 0003727 342.0009 113.8232 15.49590945 27970",
    //   },
    //   {
    //     name: "ISS DEB",
    //     line1:
    //       "1 56434U 98067VJ  23235.50975005  .00053935  00000+0  62609-3 0  9998",
    //     line2:
    //       "2 56434  51.6384 350.7028 0007891 337.2000  22.8642 15.61193868 17411",
    //   },
    //   {
    //     name: "SHENZHOU-16 (SZ-16)",
    //     line1:
    //       "1 56761U 23077A   23208.56879338  .00018785  00000+0  22544-3 0  9996",
    //     line2:
    //       "2 56761  41.4743 270.5473 0007842   9.6907 350.4082 15.60421193128140",
    //   },
    //   {
    //     name: "ISS DEB",
    //     line1:
    //       "1 57212U 98067VP  23234.84712551  .00027675  00000+0  43648-3 0  9998",
    //     line2:
    //       "2 57212  51.6402 357.5245 0005627 306.8607  53.1867 15.53303066  9076",
    //   },
    // ];

    // Initialize NASA World Wind
    const wwd = new WorldWind.WorldWindow("wwd");

    // Define layers, such as imagery or terrain, if needed
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.AtmosphereLayer());
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    // Add a placemark
    var placemarkLayer = new WorldWind.RenderableLayer();
    wwd.addLayer(placemarkLayer);

    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

    //Concideraciones generales de puntos
    placemarkAttributes.imageOffset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION,
      0.3,
      WorldWind.OFFSET_FRACTION,
      0.0
    );

    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
      WorldWind.OFFSET_FRACTION,
      0.5,
      WorldWind.OFFSET_FRACTION,
      1.0
    );

    // Create a model layer to hold the 3D models
    const modelLayer = new WorldWind.RenderableLayer("3D Models");

    // Add the model layer to the World Wind window
    wwd.addLayer(modelLayer);

    // Create a placemark for each selected satellite
    satelliteData.length &&
      satelliteData.forEach((st) => {
        var issSatRec = SGP4.twoline2rv(st.line1, st.line2, SGP4.wgs84());
        var now = new Date();

        var positionAndVelocity = SGP4.propogate(
          issSatRec,
          now.getUTCFullYear(),
          now.getUTCMonth() + 1,
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        );

        // GMST required to get Lat/Long
        var gmst = SGP4.gstimeFromDate(
          now.getUTCFullYear(),
          now.getUTCMonth() + 1,
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        );

        // Geodetic coordinates
        var geodeticCoordinates = SGP4.eciToGeodetic(
          positionAndVelocity.position,
          gmst
        );

        // Coordinates in degrees
        var longitude = SGP4.degreesLong(geodeticCoordinates.longitude);
        var latitude = SGP4.degreesLat(geodeticCoordinates.latitude);

        // Create a position for the satellite
        const position = new WorldWind.Position(latitude, longitude, 1000e3);

        var placemark = new WorldWind.Placemark(
          position,
          true,
          placemarkAttributes
        );
        placemark.label = st.name;

        placemark.alwaysOnTop = true;

        placemarkLayer.addRenderable(placemark);

        // Create a Collada loader and direct it to the desired directory and .dae file
        const colladaLoader = new WorldWind.ColladaLoader(position, {
          dirPath: "./",
        });

        // Load the Collada model
        colladaLoader.load("iss.dae", function (scene) {
          scene.scale = 30000;
          modelLayer.addRenderable(scene);
        });
      });

    // Set the initial view
    wwd.navigator.lookAtLocation.latitude = 0;
    wwd.navigator.lookAtLocation.longitude = 0;
    wwd.navigator.range = 50000000; // Set an initial range (adjust as needed)

    // Redraw the World Wind window
    wwd.redraw();

    console.log(satelliteData);
  }, [satelliteData]);

  return (
    <div className="satellite-tracker-body">
      <canvas id="wwd" style={{ width: "100%", height: "100vh" }}>
        Your browser does not support HTML5 Canvas.
      </canvas>
    </div>
  );
};

export default SatelliteTracker;
