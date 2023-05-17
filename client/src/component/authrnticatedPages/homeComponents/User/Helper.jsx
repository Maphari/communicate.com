import React, { useState, useEffect } from "react";
import { Map } from "../Map";
import { Link } from "react-router-dom";
import Loader from "../../../animation/Loder";
import { Nav } from "../Nav";

export const Helper = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ws, setWs] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setLongitude(longitude);
      setLatitude(latitude);
    });
  }, [latitude, longitude]);

  useEffect(() => {
    // Establish a new connection to our websocket server
    const newWs = new WebSocket("ws://localhost:8080");
    newWs.onopen = () => {
      console.log("WebSocket connection established.");
    };
    newWs.onmessage = function (message) {
      const receivedData = message.data;
      setData(receivedData);
    };
    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    newWs.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    setWs(newWs);

    if (ws) {
      newWs.send("flmlbtgfbfhvoihmrtmbh");
    }
  }, []);

  useEffect(() => {
    if (data) {
      // Process the received data and perform any required actions
      console.log("Received data:", data);
    }
  }, [data]);

  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="pt-[3.6rem] flex flex-wrap h-screen w-full">
          <section className="w-[25%] py-3 px-4 overflow-auto">
            <div className="mb-5 border p-2 rounded">
              <h1 className="text-xl font-bold opacity-60">Requests</h1>
              {!isRequest ? (
                <p className="opacity-40 mt-2 text-sm">
                  No request at the moment
                </p>
              ) : (
                <div className="mt-2">
                  <div>
                    <h1 className="font-bold">Pickup point</h1>
                    <p className="text-md mt-[0.1rem]">
                      522 thabo sehume street
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Destination point</h1>
                    <p className="text-md mt-[0.1rem]">32 Jeppe street</p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Pickup information</h1>
                    <p className="text-md mt-[0.1rem]">
                      Names: Maphari phumudzo
                    </p>
                    <p className="text-md mt-[0.1rem]">
                      Email: Phumudzo2001@gmail.com
                    </p>
                    <p className="text-md mt-[0.1rem]">
                      Phone Number: +27 79 788 1660
                    </p>
                    <div className="mt-1">
                      <h1 className="font-bold">Pickup instruction</h1>
                      <p>i will be waiting outside</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button className="w-[55%] transition-all duration-700 ease-linear bg-yellow-500 hover:bg-yellow-600 p-2 rounded font-bold text-white">
                      Accept request
                    </button>
                    <button className="transition-all duration-700 ease-linear bg-red-500 hover:bg-red-600 p-2 rounded font-bold text-white">
                      Decline request
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between">
                <h1 className="text-lg">Recent requests</h1>
                <Link to="">See all</Link>
              </div>
              <p className="opacity-40 mt-2 text-sm">
                No recent request at the moment
              </p>
            </div>
          </section>
          <Map centerPickupPoint={[longitude, latitude]} />
        </section>
      </>
    );
  }
};