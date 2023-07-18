import React, { useEffect, useState, useContext } from "react";
import { Input } from "../../../Input";
import { InputFile } from "../../../InputFile";
import { ButtonPrimary } from "../../../Button";
import { DataToSendContext } from "../../../context/DataTosendContext/DataToSendContext";

export const Equipment = () => {
  const { helperData } = useContext(DataToSendContext);
  const [driverEquipment, setDriverEquipment] = useState(null);
  const [carType, setCarType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [carColor, setCarColor] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [carTypeError, setCarTypeError] = useState("");
  const [plateNumberError, setPlateNumberError] = useState("");
  const [carColorError, setCarColorError] = useState("");
  const [profilePictureError, setProfilePictureError] = useState("");

  const handleUserEquipmentInformation = async (e) => {
    try {
      e.preventDefault();
      const email = helperData?.helper?.email;

      const sendEquipmentInformation = await axios.post(
        "/api/update_driver-information",
        {
          carType,
          plateNumber,
          carColor,
          profilePicture,
          email,
        }
      );

      if (sendEquipmentInformation.data) console.log(data);
    } catch (error) {
      toastNotificationError(error.message);
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
    else if (carColor.length <= 3)
      setCarColorError("Car color must be more than 3 characters");
    else setCarColorError("");
  };
  const plateNumberValidator = (e) => {
    setPlateNumber(e.target.value);
    if (!plateNumber) setPlateNumberError("Plate number is required");
    else setPlateNumberError("");
  };

  useEffect(() => {
    const getDriverInformation = async () => {
      try {
        const email = helperData?.helper?.email;
        const returnedDriverInformation = await axios.post(
          "/api/update_driver-information",
          { email }
        );
        setDriverEquipment(returnedDriverInformation.data);
      } catch (error) {
        toastNotificationError("Internal Server Error");
      }
    };
    getDriverInformation();
  }, []);

  return (
    <>
      <section className="overlay-equipment__inner">
        <section className="welcomescreen-container">
          <section className="welcomescreen-container__main rounded">
            <section className="welcomescreen-container__main-inner w-full">
              <form
                className="w-full"
                onSubmit={handleUserEquipmentInformation}
              >
                <Input
                  header="Enter car type"
                  iconName="car"
                  type="text"
                  placeholder="Enter car type"
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
                <InputFile
                  header="Profile picture"
                  type="file"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                  icon={
                    !profilePicture ? (
                      <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>
                    ) : (
                      <i className="fa-solid fa-circle-check text-lime-600 mr-2"></i>
                    )
                  }
                  errorMessage={profilePictureError && profilePictureError}
                />
                <ButtonPrimary buttonText="Save information" />
              </form>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};
