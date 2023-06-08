import React, { useEffect, useState } from "react";
import { Nav } from "../Nav";
import { useSelector, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const RequestInformation = () => {
  const requestData = useSelector((state) => state.requestHelper);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);

  const requestPickup = () => {
    if (requestData.requestID && ws) {
      const sendingData = JSON.stringify(requestData);
      ws.send(sendingData);
    } else {
      toastNotificationError("Something went wrong");
      navigate("/home", { replace: true });
    }
  };

  const toastNotificationSuccess = (message) => {
    toast.promise(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };
  const toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "toast-success",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8080");
    newWs.onopen = () => {
      console.log("WebSocket connection established.");
    };
    newWs.onmessage = (event) => {
      toastNotificationSuccess("Creating and checking available pickup");
    };
    newWs.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    newWs.onclose = () => {
      console.log("WebSocket connection closed.");
    };
    setWs(newWs);
  }, []);


  return (
    <>
    <Nav />
      <section className="request-info-container flex flex-col items-center justify-center p-[2rem]">
        <section className="border p-3">
          <h1 className="text-2xl mb-3 font-[600] text-[#333]">
            Your request information
          </h1>
          <section>
            <div className="my-2">
              <h1 className="font-[600] mb-1 text-[1.1rem] text-[#333]">
                Pickup Point
              </h1>
              <p className="text-[1rem]">{requestData.pickupPoint}</p>
            </div>
            <div className="my-2">
              <h1 className="font-[600] mb-1 text-[1.1rem] text-[#333]">
                Destination Point
              </h1>
              <p className="text-[1rem]">{requestData.destinationPoint}</p>
            </div>
            <div className="my-2">
              <h1 className="font-[600] mb-1 text-[1.1rem] text-[#333]">
                Pickup information
              </h1>
              <p className="text-[1rem]">
                <span className="font-[500] text-[#333]">Names:</span>{" "}
                {requestData.pickupNames}
              </p>
              <p className="text-[1rem]">
                <span className="font-[500] text-[#333]">Mobile:</span>{" "}
                {requestData.pickupMobile}
              </p>
              <p className="text-[1rem]">
                <span className="font-[500] text-[#333]">Instructions:</span>{" "}
                {requestData.pickupInstruction}
              </p>
            </div>
          </section>
          <div className="flex items-center gap-1">
            <button onClick={requestPickup} className="bg-cyan-600 p-[0.5rem] flex justify-center items-center flex-1 text-white font-[600] transition-all duration-500 ease-linear hover:bg-cyan-700">
              Request pickup
            </button>
            <button className="bg-slate-200 p-[0.5rem] font-[600] transition-all duration-500 ease-linear hover:bg-slate-300">
              Update information
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default connect()(RequestInformation);
