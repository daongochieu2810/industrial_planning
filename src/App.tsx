import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { Coordinate } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./App.css";

function App() {
  const mapContainer = useRef(null);
  const [lat, setLat] = useState<number>(34);
  const [lon, setLon] = useState<number>(5);
  const [zoom, setZoom] = useState<number>(2);
  function coordinatesGeocoder(query: any) {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    if (!matches) {
      return null;
    }
    const coordinateFeature = (lng: number, lat: number) => {
      return {
        center: [lng, lat],
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        place_name: "Lat: " + lat + " Lng: " + lng,
        place_type: ["coordinate"],
        properties: {},
        type: "Feature",
      };
    };
    let coord1 = Number(matches[1]);
    let coord2 = Number(matches[2]);
    let geocodes = [];

    if (coord1 < -90 || coord1 > 90) {
      // must be lng, lat
      geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
      // must be lat, lng
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
      // else could be either lng, lat or lat, lng
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
  }
  useEffect(() => {
    if (mapContainer.current) {
      const map: mapboxgl.Map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/examples/cj68bstx01a3r2rndlud0pwpv",
        center: {
          lng: -74.00649562332922,
          lat: 40.70811328605049,
        },
        zoom: 15,
        pitch: 55,
        antialias: true,
      });

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          localGeocoder: coordinatesGeocoder,
          zoom: zoom,
          placeholder: "Try: -40, 170",
          mapboxgl: mapboxgl,
        })
      );
      map.on("load", function () {
        map.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        });
      });
    }
  }, [mapContainer.current]);
  return (
    <div>
      <div ref={mapContainer} className="map"></div>
    </div>
  );
}

export default App;
