import mongoose from "mongoose";
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
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    lowecase: true,
    validate: {
      validator: (email) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
      },
      message: "Please enter a valid email address",
    },
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
    ref: 'User'
  },
});

mongoose.model("Requests", requestsSchema);
