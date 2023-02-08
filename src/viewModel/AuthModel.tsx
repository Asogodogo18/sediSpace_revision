import { View, Text } from "react-native";
import React, { useState } from "react";
import { Auth } from "../Api";

const useAuthModel = () => {
  return {
    Login: (payload: { email: string; password: string }) =>
      Auth.Login(payload),
    SignUp: (payload: {
      name: string;
      surname: string;
      email: string;
      username: string;
      password: string;
    }) => Auth.SignUp(payload),
  };
};

export default useAuthModel;
