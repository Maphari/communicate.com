import React, { Component } from "react";
import { PickupRide } from "./PickupRide";
import { WhichVihicle } from "./WhichVihicle";
import { toast } from "react-toastify";
import axios from "axios";
import ClientKeys from "../../../keys/ClientKeys";

export class DistanceCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: null,
      duration: null,
      isBackClicked: false,
      isMotocycleSelected: false,
      isBuckySelected: false,
      isVanSelecetd: false,
      isTruckSelected: false,
    };
  }
  toastNotificationError = (message) => {
    toast.error(message, {
      toastId: "toast-error",
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  calculateDistance = async () => {
    const { pickupPointCoords, destinationPointCoords } = this.props;
    const MAPBOX_KEY = ClientKeys.MAPBOX_API_KEY;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupPointCoords};${destinationPointCoords}?geometries=geojson&access_token=${MAPBOX_KEY}`
      );
      if (response.data.code === "Ok" && response.data.uuid)
        this.setState({
          distance: response.data.routes[0].distance,
          duration: response.data.routes[0].duration,
        });
    } catch (error) {
      this.toastNotificationError("Error message: " + error.message);
    }
  };

  distanceChecker = (distance) => {
    if (distance > 1000) {
      const kilometers = (distance / 1000).toFixed(2);
      return `${kilometers} km`;
    } else {
      return `${distance} m`;
    }
  };

  timeChecker = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  bikePriceDistanceChecker = () => {
    const chargePerKM = 20;
    const baseCharge = 5;
    const distance = this.state.distance;
    const timeInMinutes = this.state.duration; 
  
    const distanceCharge = chargePerKM * (distance / 1000);
    const timeCharge = 0.5 * timeInMinutes; // Assuming a rate of 0.5 per minute.
  
    // Calculate the total fare by adding base fare, distance charge, and time charge.
    const totalFare = baseCharge + distanceCharge + timeCharge;
  
    return totalFare.toFixed(2); // Return the total fare with two decimal places.
  };
  
  buckyPriceDistanceChecker = () => {
    const chargePerKM = 30;
    const baseCharge = 10;
    const distance = this.state.distance;
    const timeInMinutes = this.state.duration; 
  
    const distanceCharge = chargePerKM * (distance / 1000);
    const timeCharge = 0.5 * timeInMinutes; // Assuming a rate of 0.5 per minute.
  
    // Calculate the total fare by adding base fare, distance charge, and time charge.
    const totalFare = baseCharge + distanceCharge + timeCharge;
  
    return totalFare.toFixed(2); // Return the total fare with two decimal places.
  };
  vanPriceDistanceChecker = () => {
    const chargePerKM = 35;
    const baseCharge = 15;
    const distance = this.state.distance;
    const timeInMinutes = this.state.duration; 
  
    const distanceCharge = chargePerKM * (distance / 1000);
    const timeCharge = 0.5 * timeInMinutes; // Assuming a rate of 0.5 per minute.
  
    // Calculate the total fare by adding base fare, distance charge, and time charge.
    const totalFare = baseCharge + distanceCharge + timeCharge;
  
    return totalFare.toFixed(2); // Return the total fare with two decimal places.
  };

  truckPriceDistanceChecker = () => {
    const chargePerKM = 40;
    const baseCharge = 20;
    const distance = this.state.distance;
    const timeInMinutes = this.state.duration; 
  
    const distanceCharge = chargePerKM * (distance / 1000);
    const timeCharge = 0.5 * timeInMinutes; // Assuming a rate of 0.5 per minute.
  
    // Calculate the total fare by adding base fare, distance charge, and time charge.
    const totalFare = baseCharge + distanceCharge + timeCharge;
  
    return totalFare.toFixed(2); // Return the total fare with two decimal places.
  };

  componentDidMount() {
    this.calculateDistance();
  }

  render() {
    return (
      <>
        {!this.state.isBackClicked ? (
          <section className="dashboard-container__content_ride drop-shadow-2xl rounded-xl">
            <header className="w-full flex items-center justify-between">
              <div>
                <h1 className="mb-[0.2rem] mt-4 text-white opacity-70 font-bold text-lg">
                  Choose a pickup ride
                </h1>
                <p className="text-white font-normal opacity-50 text-sm">
                  Choose your ride wisely
                </p>
              </div>
            </header>

            <section className="bg-[#1f1f1f] mt-3 text-white py-2 px-3 rounded-xl flex flex-wrap items-center justify-between">
              <p className="opacity-80 text-sm">
                Distance:{" "}
                {this.state.distance
                  ? this.distanceChecker(this.state.distance)
                  : "Loading..."}
              </p>
              <p className="opacity-80 text-sm">
                Estimated time:{" "}
                {this.state.duration
                  ? this.timeChecker(this.state.duration)
                  : "Loading..."}
              </p>
            </section>
            <section>
              <PickupRide
                onSelectRide={() =>
                  this.setState({
                    isMotocycleSelected: true,
                    isBackClicked: true,
                  })
                }
                iconName="motorcycle"
                header="Bike"
                price={`R${this.bikePriceDistanceChecker()}`}
                discription="Motorcycles are exclusively designed to transport packages and for delivering small parcels."
              />
              <PickupRide
                onSelectRide
                iconName="truck-pickup"
                header="Bucky"
                price={`R${this.buckyPriceDistanceChecker()}`}
                discription="The Van is a versatile mid-sized delivery vehicle known for its ample cargo space."
              />
              <PickupRide
                onSelectRide
                iconName="van-shuttle"
                header="Van"
                price={`R${this.vanPriceDistanceChecker()}`}
                discription="The Van is a versatile mid-sized delivery vehicle known for its ample cargo space."
              />
              <PickupRide
                onSelectRide
                iconName="truck"
                header="Truck"
                price={`R${this.truckPriceDistanceChecker()}`}
                discription="Trucks are heavy-duty vehicles designed to transport large and bulky items"
              />
            </section>
          </section>
        ) : this.state.isBackClicked ? (
          <WhichVihicle
            distance={
              this.state.distance
                ? this.distanceChecker(this.state.distance)
                : "Loading..."
            }
            duration={
              this.state.duration
                ? this.timeChecker(this.state.duration)
                : "Loading..."
            }
            isBackClicked={() => this.setState({ isBackClicked: false, isMotocycleSelected: false })}
          />
        ) : null}
      </>
    );
  }
}
