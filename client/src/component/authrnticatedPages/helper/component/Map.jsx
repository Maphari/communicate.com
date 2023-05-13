import { useRef, useEffect, useState } from "react";
import PRIVATEKEY from "../../../../../../privateKeys/privateKeys";
import mapboxgl from "mapbox-gl";
import MapboxSupported from "@mapbox/mapbox-gl-supported";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

export const Map = (props) => {
  const { centerPickupPoint, centerDestinationPoint } = props;
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // create a ref to the map container
  const directionsRef = useRef(null); // create a ref to the directions control
  const [routeProgress, setRouteProgress] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = PRIVATEKEY.MAPBOX_API_KEY;

    // check if the browser supports WebGL
    if (!MapboxSupported.supported({})) {
      mapContainerRef.current.innerHTML =
        "WebGL is not supported by your browser.";
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // use the ref to the map container
      style: "mapbox://styles/phumudzo001/clgup6p64005k01qy44fo072q",
      center: centerPickupPoint,
      zoom: 13,
    });

    // create a new NavigationControl and add it to the map
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    setMap(map);
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    let pickupMarker, destinationMarker;

    if (centerPickupPoint) {
      pickupMarker = new mapboxgl.Marker({ color: "#eab308" })
        .setLngLat(centerPickupPoint)
        .addTo(map);
    }

    if (centerDestinationPoint) {
      destinationMarker = new mapboxgl.Marker()
        .setLngLat(centerDestinationPoint)
        .addTo(map);

      // update the map center to the destination point after 1 second delay
      const timeoutId = setTimeout(() => {
        map.setCenter(centerDestinationPoint);
      }, 1000);

      if (!directionsRef.current) {
        // Create a new Mapbox Directions object
        const directions = new MapboxDirections({
          accessToken: PRIVATEKEY.MAPBOX_API_KEY,
          unit: "metric",
          profile: "mapbox/driving",
          alternatives: true,
          congestion: true,
          interactive: false,
          controls: {
            inputs: false,
            instructions: true,
            profileSwitcher: true,
          },
        });

        // Add the Mapbox Directions plugin to the map
        map.addControl(directions, "top-left");

        // Set the pickup and destination points for the directions object
        directions.setOrigin(centerPickupPoint);
        directions.setDestination(centerDestinationPoint);

        // Listen for the directions object to emit a `route` event
        directions.on("route", (event) => {
          // Get the route from the directions object
          const route = event.route[0];
          // Add the route to the map as a layer
          map.addLayer({
            id: "directions",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route.geometry.coordinates,
                },
              },
            },
            paint: {
              "line-color": "#fff",
              "line-width": 8,
              "line-opacity": 0.8,
            },
          });
        });

        // Inside the useEffect that creates the Mapbox Directions object, add a listener for the routeProgress event, and update the routeProgress state variable:
        directions.on("routeProgress", (event) => {
          setRouteProgress(event);
        });
        // Modify the code that creates the pickup marker to add a background behind the marker, and set its color based on the route progress:
        if (centerPickupPoint) {
          const pickupMarkerEl = document.createElement("div");
          pickupMarkerEl.className = "marker";
          pickupMarkerEl.style.background = getMarkerBackground(routeProgress);

          pickupMarker = new mapboxgl.Marker({ element: pickupMarkerEl })
            .setLngLat(centerPickupPoint)
            .addTo(map);
        }
        // Define the getMarkerBackground function that returns the color of the background based on the route progress:
        function getMarkerBackground(routeProgress) {
          if (!routeProgress) {
            return "#eab308";
          }

          const distanceRemaining =
            routeProgress.route.distance - routeProgress.distance;
          const distanceTraveled = routeProgress.distance;
          const opacity =
            distanceTraveled / (distanceRemaining + distanceTraveled);
          const color = opacity === 1 ? "#8c8c8c" : "#eab308";

          return `rgba(${hexToRgb(color)}, ${opacity})`;
        }

        function hexToRgb(hex) {
          const match = hex.slice(1).match(/.{1,2}/g);
          return `${parseInt(match[0], 16)}, ${parseInt(
            match[1],
            16
          )}, ${parseInt(match[2], 16)}`;
        }

        return () => {
          clearTimeout(timeoutId);
          // Remove the directions object and the directions layer from the map
          map.removeControl(directions);
          map.removeLayer("directions");
          // Remove the destination marker and geofence listener from the map
          destinationMarker.remove();
        };
      }
    }
  }, [map, centerPickupPoint, centerDestinationPoint]);

  return <div ref={mapContainerRef} className="w-full h-full"></div>;
};
