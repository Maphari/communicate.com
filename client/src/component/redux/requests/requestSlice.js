import { createSlice } from "@reduxjs/toolkit";

const initialRequestFormState = {
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
} = requestSclice.actions;

export default requestSclice.reducer;
