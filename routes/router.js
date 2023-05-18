const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Requests = mongoose.model("Requests");
const User = mongoose.model("user");
const Jwt = require("jsonwebtoken");
const PRIVATEKEYS = require("../privateKeys/privateKeys");


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

    const theRequest = await User.findOne({ email: requesterUsername });

    const createRequest = new Requests({
      createdBY: theRequest._id,
      requestID: null,
      pickupPoint: pickup,
      destinationPoint: destination,
      names: pickupNames,
      mobile: pickupPhoneNumber,
      pickInstruction: pickupInstruction,
    });
    const token = Jwt.sign(
      { userId: createRequest._id },
      PRIVATEKEYS.MY_SECRET,
      { expiresIn: "24" }
    );
    createRequest.requestID = token;
    await createRequest.save();

    if (createRequest?.requestID && theRequest) {
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

router.get("/api/current_user", async (req, res) => {
  try {
    const theRequestDB = await Requests.find().exec();
    res.json(theRequestDB);
  } catch (error) {
    res.json({ errorMessage: error.message });
  }
});

module.exports = router;
