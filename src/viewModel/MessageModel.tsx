import { View, Text } from "react-native";
import React, { useState } from "react";
import { Auth } from "../Api";
import { MOCK_SERVER_URL } from "../constants/api-constants";

const useMessageModel = () => {
  const getUserMessages = async (id) => {
    const URL = `${MOCK_SERVER_URL}/messages?userId=${id}`;
    return fetch(URL);
  };
  const deleteUserMessages = async (id) => {
    const URL = `${MOCK_SERVER_URL}/messages?userId=${id}`;
    return fetch(URL);
  };

  return {
    getUserMessages,
    deleteUserMessages,
  };
};

export default useMessageModel;
