const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Requests = mongoose.model("Requests");
const Driver = mongoose.model("Helper");
const User = mongoose.model("user");
const { v4: uuidv4 } = require("uuid");

router.post("/api/request_pickup", async (req, res) => {
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

router.post("/api/update-helper-location", async (req, res) => {
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
});

router.get("/api/get-drivers", async (req, res) => {
  try {
    const foundDrivers = await Driver.find().exec();
    if (foundDrivers) {
      res.status(200).json(foundDrivers);
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;
