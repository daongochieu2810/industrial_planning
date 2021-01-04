import React, { useState, useEffect, useRef } from "react";
import mapboxgl, {
  Layer,
  Map,
  MapMouseEvent,
  MapDataEvent,
  PointLike,
} from "mapbox-gl";
import suncalc from "suncalc";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "../../App.css";

function MainMap() {
  const mapContainer = useRef(null);
  const [lat, setLat] = useState<number>(34);
  const [lon, setLon] = useState<number>(5);
  const [zoom, setZoom] = useState<number>(15.5);
  const [map, setMap] = useState<Map>(null);
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

  function getSunPosition(map: Map) {
    let center = map.getCenter();
    let sunPos = suncalc.getPosition(new Date(), center.lat, center.lng);
    let sunAzimuth = 180 + (sunPos?.azimuth * 180) / Math.PI;
    let sunAltitude = 90 - (sunPos?.altitude * 180) / Math.PI;
    return [sunAzimuth, sunAltitude];
  }

  useEffect(() => {
    console.log("map changed");
    if (map) {
      map.removeLayer("sky");
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-opacity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            0,
            5,
            0.3,
            8,
            1,
          ],
          // set up the sky layer for atmospheric scattering
          "sky-type": "atmosphere",
          // explicitly set the position of the sun rather than allowing the sun to be attached to the main light source
          "sky-atmosphere-sun": getSunPosition(map),
          // set the intensity of the sun as a light source (0-100 with higher values corresponding to brighter skies)
          "sky-atmosphere-sun-intensity": 5,
        },
      } as any);
    }
  }, [map]);

  function hideExtrude(map: Map, e: MapMouseEvent & MapDataEvent) {
    let bbox: [PointLike, PointLike] = [
      [e.point.x - 5, e.point.y - 5],
      [e.point.x + 5, e.point.y + 5],
    ];
    let features = map.queryRenderedFeatures(bbox, {
      layers: ["3d-buildings"],
    });
    let filter = features.reduce(
      function (memo, feature) {
        memo.push(["!=", ["id"], feature.id]);
        return memo;
      },
      ["all", ["!=", ["id"], -1]]
    );
    //var filter = ["all", ["!=", ["id"], -1], ["!=", ["id"], features[0].id]];
    map.setFilter("3d-buildings", filter);
  }

  useEffect(() => {
    if (mapContainer.current) {
      const map: mapboxgl.Map = new mapboxgl.Map({
        style: "mapbox://styles/mapbox/light-v10",
        center: [-74.0066, 40.7135],
        zoom: zoom,
        pitch: 45,
        bearing: -17.6,
        container: mapContainer.current,
        antialias: true,
      });
      setMap(map);

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          localGeocoder: coordinatesGeocoder,
          zoom: zoom,
          placeholder: "Try: -40, 170",
          mapboxgl: mapboxgl,
        })
      );
      map.on("click", function (e: MapMouseEvent & MapDataEvent) {
        hideExtrude(map, e);
      });
      map.on("load", function () {
        // Insert the layer beneath any symbol layer.
        var layers: Layer[] = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            labelLayerId = layers[i].id;
            break;
          }
        }
        map.addLayer({
          id: "sky",
          type: "sky",
          paint: {
            "sky-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0,
              5,
              0.3,
              8,
              1,
            ],
            // set up the sky layer for atmospheric scattering
            "sky-type": "atmosphere",
            // explicitly set the position of the sun rather than allowing the sun to be attached to the main light source
            "sky-atmosphere-sun": getSunPosition(map),
            // set the intensity of the sun as a light source (0-100 with higher values corresponding to brighter skies)
            "sky-atmosphere-sun-intensity": 5,
          },
        } as any);
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
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
          },
          labelLayerId
        );
        map.addSource("currentBuildings", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
        map.addLayer(
          {
            id: "highlight",
            source: "currentBuildings",
            type: "line",
            minzoom: 15,
            paint: {
              "line-color": "#f00",
              "line-width": 3,
            },
          },
          labelLayerId
        );
        map.on("click", "3d-buildings", function (e) {
          (map.getSource("currentBuildings") as any).setData({
            type: "FeatureCollection",
            features: e.features,
          });
        });
      });
    }
  }, [mapContainer.current]);
  return <div ref={mapContainer} className="map flex-1" />;
}

export default MainMap;
