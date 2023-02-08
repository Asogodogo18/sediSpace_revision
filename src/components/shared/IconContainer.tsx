import { View, Text } from "react-native";
import React from "react";
import Box from "./Box";

const IconContainer = ({ children, ...props }) => (
  <Box width={"100%"} alignItems={"center"} flexDirection={"row"} {...props}>
    {children}
  </Box>
);

export default IconContainer;
