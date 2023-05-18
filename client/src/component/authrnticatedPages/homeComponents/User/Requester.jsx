import React, { useState, useEffect, useContext } from "react";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";
import { Nav } from "../Nav";
import { Map } from "../Map";
import { toast } from "react-toastify";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  setRequestID,
  setPickupNames,
  setPickupPhoneNumber,
  setPickupInstruction,
} from "../../../redux/requests/requestSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../animation/Loder";
import axios from "axios";
import PRIVATEKEY from "../../../ClientKeys/ClientKeys";

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
  const requestForm = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
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
          pickupPhoneNumber: requestForm.pickupPhoneNumber,
          pickupInstruction: requestForm.pickupInstruction,
        }),
      });
      const request = await createdRequest.json();
      dispatch(setRequestID(request?.request?.requestID));

      const data = JSON.stringify(request);

      if (ws && request) {
        ws.send(data);
      } else {
        toastNotificationError("Something went wrong reload and try again!!");
      }
    } catch (error) {
      toastNotificationError(error.message);
    }
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

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8080");
    newWs.onopen = () => {
      console.log("WebSocket connection established.");
    };
    newWs.onmessage = (event) => {
      toastNotificationSuccess("Creating a pick for you");
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

  if (!longitude && !latitude) {
    return <Loader />;
  } else {
    return (
      <>
        <Nav />
        <section className="dashboard-container">
          <section className="dashboard-container__content rounded-xl">
            <header className="w-full">
              <h1 className="mb-3 mt-4 opacity-70 font-bold text-lg">
                Find your package
              </h1>
              <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                <h1 className="mb-2 opacity-70 text-md">Where to pick up</h1>
                <div className="flex items-center border mb-3 relative bg-[#fff] text-gray-500">
                  <i className="fa-solid fa-search ml-2 opacity-60"></i>
                  <input
                    type="text"
                    placeholder="Where to pick up ?"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onClick={() =>
                      handleInputLocationAndDestinationCliked(true, false)
                    }
                    className="outline-none p-2 flex flex-1"
                  />
                  {isClickedLocation ? (
                    <div
                      onMouseLeave={() => setIsClickedLocation(false)}
                      className={`absolute top-full left-0 bg-white text-[#141414] w-full z-[500] drop-shadow-xl flex items-center flex-wrap`}
                    >
                      <h1 className="px-3 mb-2 font-bold text-md">
                        Your current location
                      </h1>
                      <div
                        onClick={() => {
                          setPickup(exactLocation.place_name);
                          setIsClickedLocation(false);
                        }}
                        className="opacity-80 hover:cursor-pointer w-full p-2 hover:bg-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-location-dot text-xl ml-2"></i>
                          <span>{exactLocation.place_name}</span>
                        </div>
                      </div>
                      <div className="opacity-80 w-full">
                        <h1 className="px-3 my-2 font-bold text-md">
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
                            }}
                            className="flex items-center gap-3 hover:cursor-pointer w-full p-2 hover:bg-slate-200"
                          >
                            <i className="fa-solid fa-location-dot text-xl ml-2"></i>
                            <span>{place?.place_name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    pickup?.trim() === "" && null
                  )}
                </div>
                <h1 className="mb-2 opacity-70 text-md">Destination point</h1>
                <div className="flex items-center border relative bg-[#fff] text-[#333]">
                  <i className="fa-solid fa-search ml-2 opacity-60"></i>
                  <input
                    placeholder="Destination point ?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onClick={() =>
                      handleInputLocationAndDestinationCliked(false, true)
                    }
                    className="outline-none p-2 flex flex-1"
                  />
                  {isClickedDestination ? (
                    <div
                      onMouseLeave={() => setIsClickedDestination(false)}
                      className={`absolute top-full left-0 bg-white w-full z-[500] drop-shadow-xl flex items-center flex-wrap`}
                    >
                      <h1 className="px-3 mb-2 font-bold text-md">
                        Your current location
                      </h1>
                      <div
                        onClick={() =>
                          handleCurrentDestination(
                            exactLocation.place_name,
                            false,
                            exactLocation
                          )
                        }
                        className="opacity-80 hover:cursor-pointer w-full p-2 hover:bg-slate-200"
                      >
                        <div className="flex items-center gap-3">
                          <i className="fa-solid fa-location-dot text-xl ml-2"></i>
                          <span>{exactLocation.place_name}</span>
                        </div>
                      </div>
                      <div className="opacity-80 w-full">
                        <h1 className="px-3 my-2 font-bold text-md">
                          Search results
                        </h1>
                        {searchDestination?.map((place, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleSearchDestination(
                                place.place_name,
                                false,
                                place
                              )
                            }
                            className="flex items-center gap-3 hover:cursor-pointer w-full p-2 hover:bg-slate-200"
                          >
                            <i className="fa-solid fa-location-dot text-xl ml-2"></i>
                            <span>{place?.place_name}</span>
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
                <h1 className="mb-1 mt-3 opacity-70 font-bold text-md">
                  Pickup information
                </h1>
              </header>
              <div>
                <label htmlFor="names" className="mt-2 mb-1 opacity-70">
                  Names
                </label>
                <div className="flex items-center border relative">
                  <input
                    id="names"
                    type="text"
                    placeholder="John Doe"
                    value={requestForm.names}
                    onChange={(e) => dispatch(setPickupNames(e.target.value))}
                    className="outline-none p-2 flex flex-1 text-[#333]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="mobile" className="mt-2 mb-1 opacity-70">
                  Phone Number
                </label>
                <div className="flex items-center border relative">
                  <input
                    id="mobile"
                    type="tel"
                    placeholder="+27 123 4567"
                    value={requestForm.pickupPhoneNumber}
                    onChange={(e) =>
                      dispatch(setPickupPhoneNumber(e.target.value))
                    }
                    className="outline-none p-2 flex flex-1 text-[#333]"
                  />
                </div>
              </div>
              <div className="mt-2 w-full">
                <label htmlFor="my-textarea" className="mb-1 opacity-70">
                  Pickup instruction
                </label>
                <textarea
                  id="my-textarea"
                  name="my-textarea"
                  rows="3"
                  cols="40"
                  value={requestForm.pickupInstruction}
                  onChange={(e) =>
                    dispatch(setPickupInstruction(e.target.value))
                  }
                  className="border outline-none text-[#333] w-full"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={handlePickupInformationSubmit}
                id="requestBTN"
                className="p-2 text-white font-bold mt-2 w-full transition-all duration-700 ease-linear hover:bg-yellow-700 bg-yellow-600"
              >
                Request pickup
              </button>
            </form>
          </section>
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
    request: state.request,
  };
};

export default connect(mapStateToProps)(Requester);
