import { combineReducers } from "redux";
import { api } from "../Api/rtkApi";
import passwordResetReducer from "./slices/passwordResetSlice";

export default combineReducers({
  [api.reducerPath]: api.reducer,
  passwordReset: passwordResetReducer,
  // remaining reducers
});
