import { useRef, useEffect, useState, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import MapboxSupported from "@mapbox/mapbox-gl-supported";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import ClientKeys from "../../ClientKeys/ClientKeys";
import { useSelector, connect } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export const Map = (props) => {
  const { centerPickupPoint, centerDestinationPoint } = props;
  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null); // create a ref to the map container
  const directionsRef = useRef(null); // create a ref to the directions control
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [driversLocation, setDriversLocation] = useState([]);
  const userSession = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");
  // const requestData = useSelector((state) => state.requestHelper);
  // Memoize the map and directions objects to prevent unnecessary re-renders
  const memoizedMap = useMemo(() => map, [map]);
  const memoizedDirections = useMemo(() => directionsRef.current, []);

  const toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "toast-error",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  // DISPLAYING MAP
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
      style: "mapbox://styles/phumudzo001/cling333700mt01qva0jccn0a",
      center: centerPickupPoint,
      zoom: 15,
    });

    // create a new NavigationControl and add it to the map
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    setMap(map);

    return () => {
      map.remove();
    };
  }, []);
  // DISPLAYING MAP AND MARKERS
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
        interactive: true,
        controls: {
          inputs: false,
          instructions: false,
        },
      });

      map.addControl(directions, "top-left");

      directions.setOrigin(centerPickupPoint);
      directions.setDestination(centerDestinationPoint);

      directions.on("route", ({ route }) => {
        const duration = route[0].duration;
        const distance = route[0].distance;
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
  ]);
  // TAKING DRIVERS DATA FROM DATABASE
  useEffect(() => {
    const getDriversLocation = async () => {
      try {
        const response = await axios.get("/api/get-drivers");
        if (response.data) {
          setDriversLocation(response.data && response.data);
          console.log(driversLocation);
        } else {
          toastNotificationError(error.message);
        }
      } catch (error) {
        toastNotificationError(error.message);
      }
    };
    getDriversLocation();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setLongitude(longitude);
      setLatitude(latitude);
    });
  }, [longitude, latitude]);

  useEffect(() => {
    // CUSTOME MARKER
    const customMarker = document.createElement("div");
    customMarker.className = "custom-marker";

    const marker = new mapboxgl.Marker({
      element: customMarker,
      anchor: "bottom",
    });

    if (longitude && latitude) {
      marker.setLngLat([longitude, latitude]).addTo(map);
    }
  }, [longitude, latitude]);

  if (!longitude && latitude) {
    return <p>Loading...</p>;
  } else {
    return <div ref={mapContainerRef} className="w-full h-full" />;
  }
};
