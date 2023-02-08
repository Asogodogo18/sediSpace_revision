import { View } from "react-native";
import React from "react";
import Box from "../Box";
import EmptyFeedBG from "../../../../assets/images/EmptyFeedBG.svg";
import Layout from "./Layout";

type Props = {
  children?: React.ReactNode;
  message?: string;
};

const EmptyFeed = (props: Props) => {
  return (
    <Layout message={props.message} bgComponent={<EmptyFeedBG />}>
      {props.children}
    </Layout>
  );
};

export default EmptyFeed;
