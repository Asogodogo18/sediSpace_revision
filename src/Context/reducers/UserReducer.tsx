import { UserContextType } from "../../types/global";

export const initialState: UserContextType = {
  signedIn: false,
  isLoading: false,
  user: {},
  auth: { authToken: "", authTokenExpiry: 0 },
};

const userReducer = (state: any, action: { type: any; payload: any }) => {
  const { type, payload } = action;

  switch (type) {
    case "ON_INIT":
      return {
        ...state,
        ...payload,
      };
    case "ON_SIGN_IN":
      return {
        ...state,
        isLoading: true,
      };
    case "SIGN_IN_SUCCESS":
      //console.log("payload signIn success: ", payload);

      return {
        ...state,
        isLoading: false,
        user: payload.user,
        auth: payload.auth,
        signedIn: true,
      };
    case "SIGN_IN_FAIL":
      return {
        ...state,
        isLoading: false,
      };

    case "ON_LOGOUT":
      return {
        ...state,
        signedIn: false,
        user: {},
        auth: {},
      };

    default:
      throw new Error(`No case for type ${type} found in authReducer.`);
  }
};

export default userReducer;
