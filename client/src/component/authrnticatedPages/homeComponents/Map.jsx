import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxSupported from "mapbox-gl-supported";
import PEIVATEKEYS from "../../../../../privateKeys/privateKeys";

export const Map = (props) => {
  const { latitude, longitude } = props;
  const mapContainerRef = useRef(null); // create a ref to the map container

  useEffect(() => {
    mapboxgl.accessToken = PEIVATEKEYS.MAPBOX_API_KEY;

    // check if the browser supports WebGL
    if (!MapboxSupported()) {
      mapContainerRef.current.innerHTML =
        "WebGL is not supported by your browser.";
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // use the ref to the map container
      style: "mapbox://styles/phumudzo001/clgus2d0v006501qy9ri978xf",
      center: [longitude, latitude],
      zoom: 13,
    });
    // create a new NavigationControl and add it to the map
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full rounded" />;
};
