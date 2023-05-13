import { createSlice } from "@reduxjs/toolkit";

const initialRequestFormState = {
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
    setSlicePickupFirstName: (state, action) => {
      state.pickupFirstName = action.payload;
    },
    setSlicePickupLastName: (state, action) => {
      state.pickupLastName = action.payload;
    },
    setSlicePickupEmail: (state, action) => {
      state.pickupEmail = action.payload;
    },
    setSlicePickupPhoneNumber: (state, action) => {
      state.pickupPhoneNumber = action.payload;
    },
    setSlicePickupInstruction: (state, action) => {
      state.pickupInstruction = action.payload;
    },
  },
});

export const {
  setPickupFirstName,
  setPickupLastName,
  setPickupEmail,
  setPickupPhoneNumber,
  setPickupInstructions,
} = requestSclice.actions;

export default requestSclice.reducer;
