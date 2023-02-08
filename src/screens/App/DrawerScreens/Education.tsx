import { View, Text } from "react-native";
import React from "react";
import Layout from "../../Layout";
import { Box, PopUp } from "../../../components";

const Education = () => {
  return (
    <Layout>
      <Box backgroundColor={"greenDark"} flex={1}>
        <PopUp />
      </Box>
    </Layout>
  );
};

export default Education;
