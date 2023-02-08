import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import Box from "./Box";
import Text from "./Text";
import { BallIndicator } from "react-native-indicators";

type LoaderProps = {
  message: string;
  sizeSpinner:number
};

const Loader: React.FC<LoaderProps> = ({ message,sizeSpinner }) => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Box position={"absolute"} top={Platform.OS ==="ios"? 310:240}>

      <BallIndicator color="green" size={sizeSpinner} animating interaction  />
      </Box>

      <Text textAlign={"center"} variant={"title"} mt={"xxl"}>
       {message}
      </Text>
    </Box>
  );
};

export default Loader;
