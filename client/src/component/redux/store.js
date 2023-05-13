import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./requests/requestSlice";

export default configureStore({
  reducer: {
    request: requestReducer,
  },
});
