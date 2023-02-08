import { AuthContextType } from "../../types/global";

export const initialState :AuthContextType = {
  signedIn: false,
  authInfo: {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_NAME":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          name: payload.name,
        },
      };
    case "UPDATE_SURNAME":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          surname: payload.surname,
        },
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          username: payload.username,
        },
      };
    case "UPDATE_EMAIL":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          email: payload.email,
        },
      };

    case "UPDATE_PASSWORD":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          password: payload.password,
        },
      };
    case "UPDATE_CONFIRM_PASSWORD":
      return {
        ...state,
        authInfo: {
          ...state.authInfo,
          confirmPassword: payload.confirmPassword,
        },
      };

    default:
      throw new Error(`No case for type ${type} found in authReducer.`);
  }
};

export default authReducer;
