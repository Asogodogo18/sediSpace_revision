import { View, Text } from "react-native";
import React from "react";
import { MOCK_SERVER_URL } from "../constants/api-constants";

const useSearchModel = () => {
  const fetchSearchResults = async (query) => {
    if (query && query.length > 0) {
      /* replaces all whitespaces in the query with + symbol in order to 
        send it as a query param in the GET request */
      const parsedQuery = query.replaceAll(" ", "+");
      const url = `${MOCK_SERVER_URL}/beers?beer_name=${parsedQuery}`;
      const res = await fetch(url);
      const resJson = res.json();
      return resJson;
    } else {
      return [];
    }
  };
  return {
    fetchSearchResults,
  };
};

export default useSearchModel;
