const express = require("express");
const requestRouter = express.Router();
const mongoose = require("mongoose");
const Requests = mongoose.model("Requests");
const Driver = mongoose.model("Helper");
const User = mongoose.model("user");
const Equipment = mongoose.model("HelperEquipment");
const { v4: uuidv4 } = require("uuid");
const checkSession = require("../middleware/authMiddleware");


const toUppercaseFields = function(str) {
  return str.toUpperCase();
}
const toUppercaseFirstLetter = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

requestRouter.post("/api/request_pickup", checkSession, async (req, res) => {
  try {
    const {
      requesterUsername,
      pickup,
      destination,
      pickupNames,
      pickupPhoneNumber,
      pickupInstruction,
    } = req.body;

    // Generate a random UUID
    const requestId = uuidv4();
    // THE PERSON WHO INITIATED THE REQUEST
    const theRequest = await User.findOne({ email: requesterUsername });
    // THE PERSON WHO IS AVAILABLE
    const driver = await Driver.findOne({ available: true });

    const createRequest = new Requests({
      createdBY: theRequest._id,
      requestID: requestId,
      requesterUsername: requesterUsername,
      pickupPoint: pickup,
      destinationPoint: destination,
      names: pickupNames,
      mobile: pickupPhoneNumber,
      pickInstruction: pickupInstruction,
      status: "pending",
    });

    if (createRequest.requestID && driver && theRequest) {
      // Assigning avaialbe helpers
      createRequest.pickupPerson = driver._id;
      createRequest.status = "accepted";
      await createRequest.save();
      res.status(200).json({
        message: "Requst created successfully",
        request: createRequest,
        requesterInformation: theRequest,
      });
    } else {
      res.json({ errorMessage: "Failed to create request" });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

requestRouter.post(
  "/api/update-helper-location",
  checkSession,
  async (req, res) => {
    try {
      const { email, long, lat } = req.body;
      const findDriver = await Driver.findOne({ email });

      if (findDriver) {
        findDriver.location = {
          type: "Point",
          coordinates: [long, lat],
        };
        // Save the updated helper to the database
        await findDriver.save();
      } else {
        res.status(404).send({ message: "Cannot find driver" });
      }
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  }
);


requestRouter.post("/api/add-equipment", checkSession, async (req, res) => {
  try {
    const { carType, plateNumber, carColor, vihicle, email } = req.body;

    const foundDriver = await Driver.findOne({ email });
    const foundEquipment = await Equipment.findOne({
      equipmentOwner: foundDriver._id,
    });

    if (!foundDriver) {
      return res.status(404).send({ message: "Driver not found" });
    }

    if (!foundEquipment && foundDriver) {
      const equipmentId = uuidv4().toString();

      const newEquipment = new Equipment({
        equipmentID: equipmentId,
        equipmentOwner: foundDriver._id,
        carType: toUppercaseFirstLetter(carType),
        plateNumber: toUppercaseFields(plateNumber),
        carColor: toUppercaseFirstLetter(carColor),
        vihicleType: vihicle,
      });

      await newEquipment.save();
      res.status(200).send({
        message: "Equipment added successfully",
        equipment: newEquipment,
      });
    } else {
      res
        .status(200)
        .send({
          equipment: foundEquipment,
          message: "Equipment already added",
        });
    }
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = requestRouter;
