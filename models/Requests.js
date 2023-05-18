const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestsSchema = new Schema({
  requestID: String,
  requesterUsername: {
    type: String,
    required: [true, "request username is required"],
  },
  pickupPoint: {
    type: String,
    required: [true, "pickup point is required"],
  },
  destinationPoint: {
    type: String,
    required: [true, "destination point is required"],
  },
  names: {
    type: String,
    required: [true, "first name is required"],
  },
  mobile: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: (newPhoneNumber) => {
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}$/.test(
          newPhoneNumber
        );
      },
      message: "Please provide a valid phone Number",
    },
  },
  pickInstruction: {
    type: String,
    required: [true, "pick instruction are required"],
  },
  createdBY: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Requests",
  },
});

mongoose.model("Requests", requestsSchema);
