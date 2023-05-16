import express from "express";
const router = express.Router();
import mongoose from "mongoose";
const Requests = mongoose.model("Requests");
const User = mongoose.model("user");
import Jwt from "jsonwebtoken";
import PRIVATEKEYS from "../privateKeys/privateKeys.js";

router.post("/api/request_pickup", async (req, res) => {
  try {
    const {
      requesterUsername,
      pickup,
      destination,
      pickupFirstName,
      pickupLastName,
      pickupEmail,
      pickupPhoneNumber,
      pickupInstruction,
    } = req.body;

    const theRequest = await User.findOne({ email: requesterUsername });

    const createRequest = new Requests({
      requestID: null,
      requesterUsername: requesterUsername,
      pickupPoint: pickup,
      destinationPoint: destination,
      firstName: pickupFirstName,
      lastName: pickupLastName,
      email: pickupEmail,
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
export default router;
