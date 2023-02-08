import { View, Text } from "react-native";
import React from "react";
import Layout from "../../Layout";
import { Box, CoverScroll } from "../../../components";

const Favorite = () => {
  return (
    <Layout>
      <Box backgroundColor={"purpleLight"} flex={1}>
        <CoverScroll />
      </Box>
    </Layout>
  );
};

export default Favorite;
