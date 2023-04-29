import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Map } from "./Map";
import Loader from "../../animation/Loder";
import axios from "axios";
import PRIVATEKEY from "../../../../../privateKeys/privateKeys";

export const Dashboard = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [exactLocation, setExactLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setLongitude(longitude);
      setLatitude(latitude);
    });
  }, [latitude, longitude]);

  useEffect(() => {
    const getExactLocation = async () => {
      const data = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${PRIVATEKEY.MAPBOX_API_KEY}`
      );
      setExactLocation(data?.data.features[0]);
    };
    getExactLocation();
  }, [latitude, longitude]);

  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="dashboard-container">
          <section className="dashboard-container__content">
            <header className="w-full">
              <form className="w-full">
                <h1 className="mb-2 opacity-70 font-bold text-md">
                  Where to pick up
                </h1>
                <div className="flex items-center border mb-3">
                  <i className="fa-solid fa-search ml-2 opacity-60"></i>
                  <input
                    type="text"
                    placeholder="Where to pick up ?"
                    value={pickup ? pickup : exactLocation.text}
                    onChange={(e) => setPickup(e.target.value)}
                    className="outline-none p-2 flex flex-1"
                  />
                </div>
                <h1 className="mb-2 opacity-70 font-bold text-md">
                  Destination point
                </h1>
                <div className="flex items-center border">
                  <i className="fa-solid fa-search ml-2 opacity-60"></i>
                  <input
                    placeholder="Destination point ?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="outline-none p-2 flex flex-1"
                  />
                </div>
              </form>
            </header>
          </section>
          <section className="dashboard-container__map drop-shadow-2xl bg-white rounded-2xl">
            <Map longitude={longitude} latitude={latitude} />
          </section>
        </section>
      </>
    );
  }
};
