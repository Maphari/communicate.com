import { createSlice } from "@reduxjs/toolkit";

const initialRequestFormState = {
  requestID: "",
  pickupNames: "",
  pickupLastName: "",
  pickupPhoneNumber: "",
  pickupInstruction: "",
};

export const requestSclice = createSlice({
  name: "requestForm",
  initialState: initialRequestFormState,
  reducers: {
    setRequestID: (state, action) => {
      state.requestID = action.payload;
    },
    setPickupNames: (state, action) => {
      state.pickupNames = action.payload;
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
  setPickupNames,
  setPickupPhoneNumber,
  setPickupInstruction,
} = requestSclice.actions;

export default requestSclice.reducer;
