import { useRef, useEffect, useState } from "react";
import PRIVATEKEY from "../../../../../privateKeys/privateKeys";
import mapboxgl from "mapbox-gl";
import MapboxSupported from "@mapbox/mapbox-gl-supported";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

export const Map = (props) => {
  const { centerPickupPoint, centerDestinationPoint } = props;
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // create a ref to the map container
  const directionsRef = useRef(null); // create a ref to the directions control
  let pickupMarker, destinationMarker;

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
            instructions: false,
          },
        });

        // Add the Mapbox Directions plugin to the map
        map.addControl(directions, "bottom-left");

        // Set the pickup and destination points for the directions object
        directions.setOrigin(centerPickupPoint);
        directions.setDestination(centerDestinationPoint);

        // Listen for the directions object to emit a `route` event
        directions.on("route", (event) => {
          // Get the route from the directions object
          const route = event.route[0];

          // Check if the "directions" layer already exists on the map
          if (map.getLayer("directions")) {
            map.removeLayer("directions");

            // Add the route to the map as a layer
            map.addLayer({
              id: "new-directions",
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
                "line-color": "yellow",
                "line-width": 8,
                "line-opacity": 0.8,
              },
            });
          }
        });

        return () => {
          clearTimeout(timeoutId);
          // Remove the directions object and the directions layer from the map
          map.removeControl(directions);
        };
      }
    }
  }, [centerPickupPoint, centerDestinationPoint, map]);

  return <div ref={mapContainerRef} className="w-[75%] h-full"></div>;
};
