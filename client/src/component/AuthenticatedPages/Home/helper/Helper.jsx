import React, { useState, useEffect, useContext } from "react";
import { Map } from "../Map";
import Loader from "../../../animation/Loder";
import { Nav } from "../Nav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  setRequestID,
  setPickupPoint,
  setDestinationPoint,
  setPickupNames,
  setPickupMobile,
  setPickupInstruction,
  setRequesterUsername,
  setRequesterEmail,
  setRequesterMobile,
} from "../../../redux/requests/requestHelperSclice";
import { useDispatch, connect } from "react-redux";
import axios from "axios";
import PRIVATEKEY from "../../../keys/ClientKeys";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";

const Helper = () => {
  const { helperData } = useContext(DataToSendContext);
  const [isRequest, setIsRequest] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [ws, setWs] = useState(null);
  const [data, setData] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [exactLocation, setExactLocation] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAcceptRequest = () => {
    if (ws) {
      const payload = JSON.stringify({ action: "accept" });
      ws.send(payload);
      toastNotificationSuccess("let's complete the pickup process");
      navigate("/account/helper-accept");
    }
  };
  const handleDeclineRequest = () => {
    if (ws) {
      const payload = JSON.stringify({ action: "decline" });
      ws.send(payload);
      setIsRequest(false);
      toastNotificationInfo("You have declied pickup");
      navigate("/account/helper-declined");
    }
  };
  const toastNotificationSuccess = (message) => {
    toast.success(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };
  const toastNotificationInfo = (message) => {
    toast.info(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };
  const toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "toast-error",
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
      if (response) {
        setIsRequest(true);
        setRequestData(response);
      }
    }
  }, [data]);
  useEffect(() => {
    const getExactLocation = async () => {
      try {
        const data = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${PRIVATEKEY.MAPBOX_API_KEY}`
        );
        setExactLocation(data?.data.features[0]);

        if (longitude && latitude && exactLocation?.place_name) {
          const email = helperData?.helper?.email;
          const long = longitude && longitude;
          const lat = latitude && latitude;
          await axios.post("/api/update-helper-location", { email, long, lat });
        }
      } catch (error) {
        toastNotificationError(error.message);
      }
    };
    getExactLocation();
  }, [latitude, longitude]);

  if (data) {
    dispatch(setRequestID(requestData?.request?.requestID));
    dispatch(setPickupPoint(requestData?.request?.pickupPoint));
    dispatch(setDestinationPoint(requestData?.request?.destinationPoint));
    dispatch(setPickupNames(requestData?.request?.names));
    dispatch(setPickupMobile(requestData?.request?.mobile));
    dispatch(setPickupInstruction(requestData?.request?.pickInstruction));
    dispatch(setRequesterUsername(requestData?.requesterInformation?.username));
    dispatch(setRequesterEmail(requestData?.requesterInformation?.email));
    dispatch(setRequesterMobile(requestData?.requesterInformation?.mobile));
  }

  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="pt-[3rem] flex flex-wrap h-screen w-full relative">
          <section className="py-3 px-4 overflow-auto absolute z-[9999] bg-[#161616] text-white drop-shadow-2xl rounded-xl top-[12%] left-[1%] max-w-[27rem]">
            <div className="mb-1 p-2 rounded">
              <h1 className="text-xl font-bold opacity-60">
                Request information
              </h1>
              {isRequest === false ? (
                <p className="opacity-40 mt-2 text-sm">
                  No request at the moment
                </p>
              ) : (
                <div className="mt-2">
                  <div className="my-2">
                    <h1 className="font-bold">Request from</h1>
                    <p className="text-md mt-[0.1rem]">
                      {requestData?.requesterUsername}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-bold">Pickup point</h1>
                    <p className="text-md mt-[0.1rem]">
                      {requestData?.pickupPoint}
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Destination point</h1>
                    <p className="text-md mt-[0.1rem]">
                      {requestData?.destinationPoint}
                    </p>
                  </div>
                  <div className="my-2">
                    <h1 className="font-bold">Pickup information</h1>
                    <p className="text-md mt-[0.1rem]">
                      Names: {requestData?.pickupNames}
                    </p>
                    <p className="text-md mt-[0.1rem]">
                      Phone Number: {requestData?.pickupMobile}
                    </p>
                    <div className="mt-1">
                      <h1 className="font-bold">Pickup instruction</h1>
                      <p>{requestData?.pickupInstruction}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      onClick={handleAcceptRequest}
                      className="transition-all flex items-center justify-center flex-1 duration-700 ease-linear bg-cyan-600 hover:bg-cyan-700 p-2 rounded font-[600] text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={handleDeclineRequest}
                      className="w-[40%] transition-all duration-700 ease-linear bg-red-500 hover:bg-red-600 p-2 rounded font-[600] text-white"
                    >
                      Decline
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

const mapStateToProps = (state) => {
  return {
    requestHelper: state.requestHelper,
  };
};

export default connect(mapStateToProps)(Helper);
