import React, { useState, useEffect } from "react";
import { Map } from "../Map";
import { Link } from "react-router-dom";
import Loader from "../../../animation/Loder";
import { Nav } from "../Nav";
import { toast } from "react-toastify";

export const Helper = () => {
  const [isRequest, setIsRequest] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ws, setWs] = useState(null);
  const [data, setData] = useState(null);
  const [requestData, setRequestData] = useState(null);

  const toastNotificationSuccess = (message) => {
    toast.success(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

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
  }, []);

  useEffect(() => {
    if (data) {
      toastNotificationSuccess("You have recived a request");
      const response = JSON.parse(data);
      if (response) setIsRequest(true);
      setRequestData(response);
    }
  }, [data]);


  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="pt-[3rem] flex flex-wrap h-screen w-full relative">
          <section className="py-3 px-4 overflow-auto absolute z-[9999] bg-white rounded-xl top-[12%] left-[1%]">
            <div className="mb-5 p-2 rounded">
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
                      {requestData?.request.pickupPoint}
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Destination point</h1>
                    <p className="text-md mt-[0.1rem]">
                      {requestData?.request.destinationPoint}
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Pickup information</h1>
                    <p className="text-md mt-[0.1rem]">
                      Names: {requestData?.request.Names}
                    </p>
                    <p className="text-md mt-[0.1rem]">
                      Phone Number: {requestData?.request.mobile}
                    </p>
                    <div className="mt-1">
                      <h1 className="font-bold">Pickup instruction</h1>
                      <p>{requestData?.request.pickInstruction}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button className="w-[50%] transition-all duration-700 ease-linear bg-yellow-500 hover:bg-yellow-600 p-2 rounded font-bold text-white">
                      Accept request
                    </button>
                    <button className="transition-all duration-700 ease-linear bg-red-500 hover:bg-red-600 p-2 rounded font-bold text-white">
                      Decline request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
          <Map centerPickupPoint={[longitude, latitude]} />
        </section>
      </>
    );
  }
};
