import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { FeedApi, PostApi } from "../../Api";
import axios from "axios";
import { MOCK_SERVER_URL } from "../../constants/api-constants";
import { useListFeedQuery } from "../../Api/FeedApi";

const useFeedController = () => {
  const getFeedList = (id) => {
    //console.log("query: ", id);
    const payload = new FormData();
    payload.append("user", id);

    return useListFeedQuery(payload,{refetchOnMountOrArgChange:true});
  };

  return { getFeedList };
};

export default useFeedController;
