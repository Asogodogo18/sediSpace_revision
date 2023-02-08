import {
  ON_INIT,
  ON_LOGOUT,
  ON_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
} from "./actions/userActionTypes.ts";
import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import UserReducer, { initialState } from "./reducers/UserReducer";
import React from "react";
import { getDataObject } from "../services/storage";
import { USER_KEY } from "../constants/general-constants";
const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  
  const onInit = (payload) => {
    dispatch({
      type: ON_INIT,
      payload,
    });
  };

  const onSignIn = () => {
    dispatch({
      type: ON_SIGN_IN,
    });
  };
  const onSignInSuccess = (payload) => {
    //console.log("dispatched");
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload,
    });
  };
  const onSignInFail = () => {
    dispatch({
      type: SIGN_IN_FAIL,
    });
  };

  const onLogOut = () => {
    dispatch({
      type: ON_LOGOUT,
    });
  };

  const value = {
    signedIn: state.signedIn,
    isLoading: state.isLoading,
    user: state.user,
    auth:  state.auth,

    onInit,
    onSignIn,
    onSignInSuccess,
    onSignInFail,
    onLogOut,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within UserContext");
  }

  return context;
};

export default useUserContext;
