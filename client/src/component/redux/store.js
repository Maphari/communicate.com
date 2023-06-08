import { configureStore } from "@reduxjs/toolkit";
import requestHelperSclice from "./requests/requestHelperSclice";

export default configureStore({
  reducer: {
    requestHelper: requestHelperSclice,
  },
});
