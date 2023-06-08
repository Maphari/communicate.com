import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  requestID: "",
  pickupPoint: "",
  destinationPoint: "",
  pickupNames: "",
  pickupMobile: "",
  pickupInstruction: "",
  requesterUsername: "",
  requesterEmail: "",
  requesterMobile: "",
};

export const requestHalperSlice = createSlice({
  name: "request",
  initialState: initialState,
  reducers: {
    setRequestID: (state, action) => {
      state.requestID = action.payload;
    },
    setPickupPoint: (state, action) => {
      state.pickupPoint = action.payload;
    },
    setDestinationPoint: (state, action) => {
      state.destinationPoint = action.payload;
    },
    setPickupNames: (state, action) => {
      state.pickupNames = action.payload;
    },
    setPickupMobile: (state, action) => {
      state.pickupMobile = action.payload;
    },
    setPickupInstruction: (state, action) => {
      state.pickupInstruction = action.payload;
    },
    setRequesterUsername: (state, action) => {
      state.requesterUsername = action.payload;
    },
    setRequesterEmail: (state, action) => {
      state.requesterEmail = action.payload;
    },
    setRequesterMobile: (state, action) => {
      state.requesterMobile = action.payload;
    },
  },
});

export const {
  setRequestID,
  setPickupPoint,
  setDestinationPoint,
  setPickupNames,
  setPickupMobile,
  setPickupInstruction,
  setRequesterUsername,
  setRequesterEmail,
  setRequesterMobile,
} = requestHalperSlice.actions;
export default requestHalperSlice.reducer;
