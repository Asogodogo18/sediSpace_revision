import {
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_EMAIL,
  UPDATE_NAME,
  UPDATE_PASSWORD,
  UPDATE_SURNAME,
} from "./actions/authActionTypes";
import { createContext, useReducer, useContext } from "react";
import authReducer, { initialState } from "./reducers/AuthReducer";
import React from "react";
const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const updateName = (text) => {
    dispatch({
      type: UPDATE_NAME,
      payload: {
        name: text,
      },
    });
  };

  const updateSurname = (text) => {
    dispatch({
      type: UPDATE_SURNAME,
      payload: {
        surname: text,
      },
    });
  };

  const updateEmail = (text) => {
    dispatch({
      type: UPDATE_EMAIL,
      payload: {
        email: text,
      },
    });
  };

  const updateUsername = (text) => {
    dispatch({
      type: UPDATE_NAME,
      payload: {
        username: text,
      },
    });
  };

  const updatePassword = (text) => {
    dispatch({
      type: UPDATE_PASSWORD,
      payload: {
        password: text,
      },
    });
  };

  const updateConfirmPassword = (text) => {
    dispatch({
      type: UPDATE_CONFIRM_PASSWORD,
      payload: {
        confirmPassword: text,
      },
    });
  };

  const value = {
    signedIn: state.signedIn,
    user: state.user,
    authInfo: state.authInfo,
    updateName,
    updateSurname,
    updateUsername,
    updateEmail,
    updatePassword,
    updateConfirmPassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthContext");
  }

  return context;
};

export default useAuth;
