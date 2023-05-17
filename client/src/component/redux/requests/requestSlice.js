import { createSlice } from "@reduxjs/toolkit";

const initialRequestFormState = {
  isRequest: false,
  requester: "",
  requestID: "",
  pickupFirstName: "",
  pickupLastName: "",
  pickupEmail: "",
  pickupPhoneNumber: "",
  pickupInstruction: "",
};

export const requestSclice = createSlice({
  name: "requestForm",
  initialState: initialRequestFormState,
  reducers: {
    setIsRequest: (state, action) => {
      state.isRequest = action.payload;
    },
    setRequestID: (state, action) => {
      state.requestID = action.payload;
    },
    setPickupFirstName: (state, action) => {
      state.pickupFirstName = action.payload;
    },
    setPickupLastName: (state, action) => {
      state.pickupLastName = action.payload;
    },
    setPickupEmail: (state, action) => {
      state.pickupEmail = action.payload;
    },
    setPickupPhoneNumber: (state, action) => {
      state.pickupPhoneNumber = action.payload;
    },
    setPickupInstruction: (state, action) => {
      state.pickupInstruction = action.payload;
    },
  },
});

export const {
  setRequestID,
  setPickupFirstName,
  setPickupLastName,
  setPickupEmail,
  setPickupPhoneNumber,
  setPickupInstruction,
  setIsRequest,
} = requestSclice.actions;

export default requestSclice.reducer;
