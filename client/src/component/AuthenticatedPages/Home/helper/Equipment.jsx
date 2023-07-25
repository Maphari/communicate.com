import React, { useEffect, useState, useContext } from "react";
import { Input } from "../../../Input";
import { ButtonPrimary } from "../../../Button";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";
import { toast } from "react-toastify";
import { EquipmentInfo } from "./EquipmentInfo";
import axios from "axios";

export const Equipment = () => {
  const { helperData } = useContext(DataToSendContext);
  const [carType, setCarType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carTypeError, setCarTypeError] = useState("");
  const [plateNumberError, setPlateNumberError] = useState("");
  const [carColorError, setCarColorError] = useState("");
  const [equipmentData, setEquipmentData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("defaultOption");

  const toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "session",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  const toastNotificationWarning = (message) => {
    toast.warning(message, {
      toastId: "session",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleUserEquipmentInformation = async (e) => {
    try {
      e.preventDefault();
      if (!carColor && !carType && !plateNumber && !selectedOption) {
        return toastNotificationWarning(
          "Please provide equipment information "
        );
      }
      const email = helperData?.helper?.email;

      const formData = new FormData();

      formData.append("carType", carType);
      formData.append("carColor", carColor);
      formData.append("plateNumber", plateNumber);
      formData.append("vihicle", selectedOption);
      formData.append("email", email);

      const equipment = await axios.post("/api/add-equipment", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      toastNotificationError(error);
    }
  };

  const carTypeValidator = (e) => {
    setCarType(e.target.value);
    if (!carType) setCarTypeError("Car type is required");
    else if (carType.length < 3)
      setCarTypeError("Car type must be more than 3 characters");
    else setCarTypeError("");
  };
  const carColorValidator = (e) => {
    setCarColor(e.target.value);
    if (!carColor) setCarColorError("Car color is required");
    else if (carColor.length < 2)
      setCarColorError("Car color must be more than 3 characters");
    else setCarColorError("");
  };
  const plateNumberValidator = (e) => {
    setPlateNumber(e.target.value);
    if (!plateNumber) setPlateNumberError("Plate number is required");
    else setPlateNumberError("");
  };

  useEffect(() => {
    const getEquipment = async () => {
      const equipment = await axios.get("/api/get-equipment", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEquipmentData(equipment?.data?.equipmentWithDriver[0]);
    };

    getEquipment();
  }, []);
  return (
    <>
      {!equipmentData?.equipmentID && !equipmentData?.equipmentOwner ? (
        <section className="overlay-equipment__inner">
          <section className="welcomescreen-container">
            <section className="welcomescreen-container__main rounded">
              <section className="welcomescreen-container__main-inner w-full">
                <form
                  className="w-[20rem]"
                  onSubmit={handleUserEquipmentInformation}
                  encType="multipart/form-data"
                >
                  <Input
                    header="Enter car model"
                    iconName="car"
                    type="text"
                    placeholder="Enter car model"
                    value={carType}
                    onChange={carTypeValidator}
                    icon={
                      !carType ? (
                        <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                      ) : (
                        <i className="fa-solid fa-circle-check text-lime-600 mr-2"></i>
                      )
                    }
                    errorMessage={carTypeError && carTypeError}
                  />
                  <Input
                    header="Enter car color"
                    iconName="palette"
                    type="text"
                    placeholder="Enter car color"
                    value={carColor}
                    onChange={carColorValidator}
                    icon={
                      !carColor ? (
                        <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                      ) : (
                        <i className="fa-solid fa-circle-check text-lime-600 mr-2"></i>
                      )
                    }
                    errorMessage={carColorError && carColorError}
                  />
                  <Input
                    header="Enter plate number"
                    iconName="hashtag"
                    type="text"
                    placeholder="Enter plate number"
                    value={plateNumber}
                    onChange={plateNumberValidator}
                    icon={
                      !plateNumber ? (
                        <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                      ) : (
                        <i className="fa-solid fa-circle-check text-lime-600 mr-2"></i>
                      )
                    }
                    errorMessage={plateNumberError && plateNumberError}
                  />
                  <div>
                    <h1 className="mb-2 text-white opacity-70 text-[0.9rem]">
                      Car Type
                    </h1>
                    <select
                      onChange={(e) => setSelectedOption(e.target.value)}
                      value={selectedOption}
                      className="bg-[#161616] p-[0.3rem] rounded w-full mb-2"
                    >
                      <option value="defaultOption" disabled>
                        Select vihicle type
                      </option>
                      <option value="bike">Bike</option>
                      <option value="bucky">Bucky</option>
                      <option value="van">Van</option>
                      <option value="truck">Truck</option>
                    </select>
                  </div>
                  <ButtonPrimary buttonText="Save information" />
                </form>
              </section>
            </section>
          </section>
        </section>
      ) : (
        <EquipmentInfo
          carModel={equipmentData.carType ? equipmentData.carType : "Loading.."}
          carColor={
            equipmentData.carColor ? equipmentData.carColor : "Loading.."
          }
          plateNumber={
            equipmentData.plateNumber ? equipmentData.plateNumber : "Loading.."
          }
          vihicleType={equipmentData.vihicleType}
        />
      )}
    </>
  );
};
