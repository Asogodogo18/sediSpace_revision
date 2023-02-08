import React from "react";

import Layout from "./Layout";
import EmptyNotificationBg from "../../../../assets/images/EmptyNotifBG.svg";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const EmptyNotification = () => {
  return (
    <Layout
      bgComponent={<EmptyNotificationBg width={width} />}
      message="Vous n'avez aucune notification en ce moment"
    ></Layout>
  );
};

export default EmptyNotification;
