import { useRef, useEffect, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import MapboxSupported from "@mapbox/mapbox-gl-supported";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import ClientKeys from "../../ClientKeys/ClientKeys";

export const Map = (props) => {
  const { centerPickupPoint, centerDestinationPoint } = props;
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // create a ref to the map container
  const directionsRef = useRef(null); // create a ref to the directions control
  const [userLocationCoords, setUserLocationCoords] = useState([]);

  // Memoize the map and directions objects to prevent unnecessary re-renders
  const memoizedMap = useMemo(() => map, [map]);
  const memoizedDirections = useMemo(() => directionsRef.current, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setUserLocationCoords(longitude, latitude);
    });
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = ClientKeys.MAPBOX_API_KEY;

    // check if the browser supports WebGL
    if (!MapboxSupported.supported({})) {
      mapContainerRef.current.innerHTML =
        "WebGL is not supported by your browser.";
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // use the ref to the map container
      style: "mapbox://styles/phumudzo001/clgus2d0v006501qy9ri978xf",
      center: centerPickupPoint,
      zoom: 13,
    });

    // create a new NavigationControl and add it to the map
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!memoizedMap) {
      return;
    }

    if (centerPickupPoint && centerDestinationPoint && !memoizedDirections) {
      const directions = new MapboxDirections({
        accessToken: ClientKeys.MAPBOX_API_KEY,
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

      if (userLocationCoords) {
        const defaultMarker = new mapboxgl.Marker()
          .setLngLat(userLocationCoords)
          .addTo(map); // Add the marker to the map
      }

      map.addControl(directions, "top-left");

      directions.setOrigin(centerPickupPoint);
      directions.setDestination(centerDestinationPoint);

      directions.on("route", ({ route }) => {
        const duration = route[0].duration;
        const distance = route[0].distance;
        // console.log("Route Distance:", distance, "meters");
        // console.log("Route Duration:", duration, "seconds");
      });

      directionsRef.current = directions;
    } else {
      if (memoizedDirections) {
        memoizedDirections.remove();
        directionsRef.current = null;
      }
    }

    return () => {
      if (memoizedDirections) {
        memoizedDirections.remove();
        directionsRef.current = null;
      }
    };
  }, [
    centerPickupPoint,
    centerDestinationPoint,
    memoizedMap,
    memoizedDirections,
    userLocationCoords,
  ]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};
