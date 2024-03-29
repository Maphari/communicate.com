import React, { useState, useEffect, useContext } from "react";
import PRIVATEKEY from "../../../keys/ClientKeys";
import { useNavigate, Link } from "react-router-dom";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";
import { Nav } from "../Nav";
import { Map } from "../Map";
import { toast } from "react-toastify";
import { useDispatch, useSelector, connect } from "react-redux";
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
import { PickupRide } from "./PickupRide";
import { DistanceCalculator } from "./DistanceCalculator";
import Loader from "../../../animation/Loder";
import axios from "axios";

const Requester = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [exactLocation, setExactLocation] = useState({});
  const [searchLocation, setSearchLocation] = useState([]);
  const [searchDestination, setSearchDestination] = useState([]);
  const [isClickedLocation, setIsClickedLocation] = useState(false);
  const [isClickedDestination, setIsClickedDestination] = useState(false);
  const [newLongitude, setNewLongitude] = useState([]);
  const [newLatitude, setNewLatitude] = useState([]);
  const [currentSearchDestinationCoords, setCurrentSearchDestinationCoords] =
    useState([]);
  const { data } = useContext(DataToSendContext);
  const requesterUsername = data?.user?.email;
  const requestForm = useSelector((state) => state.requestHelper);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const [isRequestClicked, setIsRequestClicked] = useState(false);

  const session = localStorage.getItem("token");
  const helperSession = localStorage.getItem("token-helper");

  const toastNotificationSuccess = (message) => {
    toast.success(message, {
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
  const toastNotificationInfo = (message) => {
    toast.info(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  // setting destination point to the new selected point
  const handleSearchDestination = (
    destinationPickup,
    isExactDestination,
    exactDestinationCoords
  ) => {
    setDestination(destinationPickup);
    setIsClickedDestination(isExactDestination);
    // taking the exact coords for clicked destination point point
    setCurrentSearchDestinationCoords(exactDestinationCoords?.center);
  };
  // setting current user destination  coords to the new selected point
  const handleCurrentDestination = (
    currentUserDestination,
    isExactDestinationClicked,
    exactDestinationCoords
  ) => {
    setDestination(currentUserDestination);
    setIsClickedDestination(isExactDestinationClicked);
    // taking the exact coords for clicked destination point
    setCurrentSearchDestinationCoords(exactDestinationCoords?.center);
  };

  // displaying the search results
  const handleInputLocationAndDestinationCliked = (
    isLocationClicked,
    isDestinationClicked
  ) => {
    setIsClickedLocation(isLocationClicked);
    setIsClickedDestination(isDestinationClicked);
  };

  const pickupCoords = (longitude, latitude) => {
    return [longitude, latitude];
  };
  const destinationCoords = (longitude, latitude) => {
    return currentSearchDestinationCoords &&
      currentSearchDestinationCoords.length === 2 &&
      !isNaN(longitude) &&
      !isNaN(latitude)
      ? currentSearchDestinationCoords
      : null;
  };

  const handlePickupInformationSubmit = async () => {
    try {
      const createdRequest = await fetch("/api/request_pickup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterUsername: requesterUsername,
          pickup: pickup,
          destination: destination,
          pickupNames: requestForm.pickupNames,
          pickupPhoneNumber: requestForm.pickupMobile,
          pickupInstruction: requestForm.pickupInstruction,
        }),
      });
      const request = await createdRequest.json();
      // setting request id to redux store
      dispatch(setRequestID(request?.request?.requestID));
      //if we have a request id then we can send request
      if (request?.request?.requestID) {
        dispatch(setRequestID(request?.request?.requestID));
        dispatch(setPickupPoint(request?.request?.pickupPoint));
        dispatch(setDestinationPoint(request?.request?.destinationPoint));
        dispatch(setPickupNames(request?.request?.names));
        dispatch(setPickupMobile(request?.request?.mobile));
        dispatch(setPickupInstruction(request?.request?.pickInstruction));
        dispatch(setRequesterUsername(request?.requesterInformation?.username));
        dispatch(setRequesterEmail(request?.requesterInformation?.email));
        dispatch(setRequesterMobile(request?.requesterInformation?.mobile));
        setIsRequestClicked(true);
      } else if (!request?.request?.requestID) {
        toastNotificationInfo("Please provide pickup information");
      } else {
        toastNotificationError(request.errorMessage);
      }
    } catch (error) {
      toastNotificationError(error.message);
    }
  };

  // const requestPickup = () => {
  //   if (requestData.requestID && ws) {
  //     const sendingData = JSON.stringify(requestData);
  //     ws.send(sendingData);
  //   } else {
  //     toastNotificationError("Something went wrong");
  //     navigate("/home", { replace: true });
  //   }
  // };

  useEffect(() => {
    const handleLocationSearch = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            pickup && pickup
          }.json?access_token=${PRIVATEKEY.MAPBOX_API_KEY}`
        );
        const data = await response.json();
        setSearchLocation(data?.features);
      } catch (error) {
        toastNotificationError(error.message);
      }
    };

    handleLocationSearch();
  }, [pickup]);

  useEffect(() => {
    const handleDestinationSearch = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            destination && destination
          }.json?access_token=${PRIVATEKEY.MAPBOX_API_KEY}`
        );
        const data = await response.json();
        setSearchDestination(data?.features);
      } catch (error) {
        toastNotificationError(error.message);
      }
    };

    handleDestinationSearch();
  }, [destination]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      setLongitude(longitude);
      setLatitude(latitude);
    });
  }, [latitude, longitude]);

  useEffect(() => {
    const getExactLocation = async () => {
      try {
        const data = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${PRIVATEKEY.MAPBOX_API_KEY}`
        );
        setExactLocation(data?.data.features[0]);
      } catch (error) {
        toastNotificationError(error.message);
      }
    };
    getExactLocation();
  }, [latitude, longitude]);

  useEffect(() => {
    if (session) {
      navigate("/home", { replace: true });
    } else if (helperSession) {
      navigate("/account/helper", { replace: true });
    }
  }, [session, helperSession, navigate]);

  useEffect(() => {
    setNewLongitude(longitude);
    setNewLatitude(latitude);
  }, []);

  // useEffect(() => {
  //   const newWs = new WebSocket("ws://localhost:8080");
  //   newWs.onopen = () => {
  //     console.log("WebSocket connection established.");
  //   };
  //   newWs.onmessage = (event) => {
  //     toastNotificationSuccess("Creating and checking available pickup");
  //   };
  //   newWs.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };
  //   newWs.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };
  //   setWs(newWs);
  // }, []);

  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="dashboard-container">
          {!isRequestClicked ? (
            <section className="dashboard-container__content drop-shadow-2xl rounded-xl">
              <header className="w-full">
                <h1 className="mb-3 mt-4 text-white opacity-70 font-bold text-lg">
                  Find your package
                </h1>
                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                  <h1 className="mb-2 text-white opacity-70 text-[1rem]">
                    Where to pick up
                  </h1>
                  <div
                    className={`flex ${
                      isClickedLocation ? "rounded-none" : "rounded"
                    } items-center mb-3 relative bg-[#090909] text-white`}
                  >
                    <i className="fa-solid fa-map-location-dot ml-2 text-yellow-600 opacity-95"></i>
                    <input
                      type="text"
                      placeholder="Where to pick up ?"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      onClick={() =>
                        handleInputLocationAndDestinationCliked(true, false)
                      }
                      className={`outline-none ${
                        isClickedLocation ? "rounded-none" : "rounded"
                      } p-[0.3rem] flex flex-1 font-normal text-[0.9rem] bg-[#090909] text-white`}
                    />
                    {isClickedLocation ? (
                      <div
                        onMouseLeave={() => setIsClickedLocation(false)}
                        className={`absolute rounded-b max-h-[19rem] overflow-auto top-full left-0 bg-[#090909] text-white w-full z-[500] drop-shadow-xl flex items-center flex-wrap`}
                      >
                        <h1 className="px-3 my-2 font-bold text-[0.9rem] ">
                          Your current location
                        </h1>
                        <div
                          onClick={() => {
                            setPickup(exactLocation.place_name);
                            setIsClickedLocation(false);
                            dispatch(setPickupPoint(exactLocation.place_name));
                          }}
                          className="opacity-80 hover:cursor-pointer w-full p-2 hover:bg-[#333]"
                        >
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-location-dot text-[1rem] ml-2 text-yellow-600 opacity-95"></i>
                            <span className="text-[0.9rem]">
                              {exactLocation.place_name}
                            </span>
                          </div>
                        </div>
                        <div className="opacity-80 w-full ">
                          <h1 className="px-3 my-2 font-bold text-[0.9rem]">
                            Search results
                          </h1>
                          {searchLocation?.map((place, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setNewLongitude(place.center[0]);
                                setNewLatitude(place.center[1]);
                                setPickup(place.place_name);
                                setIsClickedLocation(false);
                                dispatch(setPickupPoint(place.place_name));
                              }}
                              className="flex items-center gap-3 hover:cursor-pointer w-full p-2 hover:bg-[#333]"
                            >
                              <i className="fa-solid fa-location-dot ml-2 text-yellow-600 opacity-95"></i>
                              <span className="text-[0.9rem]">
                                {place?.place_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      pickup?.trim() === "" && null
                    )}
                  </div>
                  <h1 className="mb-2 text-white opacity-70 text-[1rem]">
                    Destination point
                  </h1>
                  <div
                    className={`flex ${
                      isClickedDestination ? "rounded-none" : "rounded"
                    } items-center relative bg-[#090909] text-white`}
                  >
                    <i className="fa-solid fa-location-dot ml-2 text-yellow-600 opacity-95"></i>
                    <input
                      placeholder="Destination point ?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      onClick={() =>
                        handleInputLocationAndDestinationCliked(false, true)
                      }
                      className={`${
                        isClickedDestination ? "rounded-none" : "rounded"
                      } outline-none p-[0.3rem] flex flex-1 font-normal text-[0.9rem] bg-[#090909] text-white`}
                    />
                    {isClickedDestination ? (
                      <div
                        onMouseLeave={() => setIsClickedDestination(false)}
                        className={`absolute ${
                          isClickedDestination ? "rounded-none" : "rounded"
                        } max-h-[19rem] overflow-auto top-full left-0 bg-[#090909] text-white w-full z-[500] drop-shadow-xl flex items-center flex-wrap`}
                      >
                        <h1 className="px-3 my-2 font-bold text-[0.9rem]">
                          Your current location
                        </h1>
                        <div
                          onClick={() => {
                            handleCurrentDestination(
                              exactLocation.place_name,
                              false,
                              exactLocation
                            );
                            dispatch(
                              setDestinationPoint(exactLocation.place_name)
                            );
                          }}
                          className="opacity-80 hover:cursor-pointer w-full p-2 hover:bg-[#333]"
                        >
                          <div className="flex items-center gap-3">
                            <i className="fa-solid fa-location-dot text-[1rem] ml-2 text-yellow-600 opacity-95"></i>
                            <span className="text-[0.9rem]">
                              {exactLocation.place_name}
                            </span>
                          </div>
                        </div>
                        <div className="opacity-80 w-full">
                          <h1 className="px-3 my-2 font-bold text-[0.9rem]">
                            Search results
                          </h1>
                          {searchDestination?.map((place, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                handleSearchDestination(
                                  place.place_name,
                                  false,
                                  place
                                );
                                dispatch(setDestinationPoint(place.place_name));
                              }}
                              className="flex items-center gap-3 hover:cursor-pointer w-full p-2 hover:bg-[#333]"
                            >
                              <i className="fa-solid fa-location-dot ml-2 text-yellow-600 opacity-95"></i>
                              <span className="text-[0.9rem]">
                                {place?.place_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      destination === "" && null
                    )}
                  </div>
                </form>
              </header>
              <form onSubmit={(e) => e.preventDefault()}>
                <header>
                  <h1 className="mb-1 mt-3 text-white opacity-70 font-bold text-md">
                    Destination information
                  </h1>
                </header>
                <div>
                  <label
                    htmlFor="names"
                    className="mt-2 mb-1 text-white opacity-70 text-[0.9rem]"
                  >
                    Names
                  </label>
                  <div className="flex rounded items-center relative bg-[#090909] text-white">
                    <i className="fa-solid fa-user text-[0.9rem] ml-2 text-yellow-600 opacity-95"></i>
                    <input
                      id="names"
                      type="text"
                      placeholder="John Doe"
                      value={requestForm.pickupNames}
                      onChange={(e) => dispatch(setPickupNames(e.target.value))}
                      className="rounded outline-none p-[0.3rem] flex flex-1 bg-[#090909] text-[0.9rem] font-normal"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="mobile"
                    className="mt-2 mb-1 text-white opacity-70 text-[0.9rem]"
                  >
                    Phone Number
                  </label>
                  <div className="flex bg-[#090909] text-white items-center relative rounded">
                    <i className="fa-solid fa-mobile text-[0.9rem] ml-2 text-yellow-600 opacity-95"></i>
                    <input
                      id="mobile"
                      type="tel"
                      placeholder="+27 123 4567"
                      value={requestForm.pickupPhoneNumber}
                      onChange={(e) =>
                        dispatch(setPickupMobile(e.target.value))
                      }
                      className="outline-none rounded p-[0.3rem] flex flex-1 bg-[#090909] text-white text-[0.9rem] font-normal"
                    />
                  </div>
                </div>
                <div className="mt-2 w-full text-white">
                  <label
                    htmlFor="my-textarea"
                    className="mb-1 text-white opacity-70 text-[0.9rem]"
                  >
                    Pickup instruction
                  </label>
                  <textarea
                    id="my-textarea"
                    name="my-textarea"
                    rows="2"
                    cols="40"
                    value={requestForm.pickupInstruction}
                    onChange={(e) =>
                      dispatch(setPickupInstruction(e.target.value))
                    }
                    className="rounded outline-none bg-[#090909] text-white w-full text-[0.9rem] font-normal"
                  ></textarea>
                </div>

                <button
                  onClick={handlePickupInformationSubmit}
                  className="p-[0.3rem] mt-1 w-full bg-yellow-700 font-[400] text-white transition-all duration-700 ease-linear hover:bg-yellow-800 rounded"
                >
                  Request For Pickup
                </button>
              </form>
            </section>
          ) : (
            <DistanceCalculator
              pickupPointCoords={
                newLongitude && newLatitude
                  ? [newLongitude, newLatitude]
                  : [longitude, latitude]
              }
              destinationPointCoords={[
                currentSearchDestinationCoords[0],
                currentSearchDestinationCoords[1],
              ]}
            />
          )}
          <Map
            centerPickupPoint={
              newLongitude && newLatitude
                ? pickupCoords(newLongitude, newLatitude)
                : pickupCoords(longitude, latitude)
            }
            centerDestinationPoint={destinationCoords(
              currentSearchDestinationCoords[0],
              currentSearchDestinationCoords[1]
            )}
          />
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

export default connect(mapStateToProps)(Requester);
