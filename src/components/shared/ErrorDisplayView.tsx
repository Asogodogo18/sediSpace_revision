import React from "react";
import Box from "./Box";
import Text from "./Text";
import ErrorBG from "../../../assets/images/ErrorBG2.svg";
import { Dimensions } from "react-native";

type ErrorDisplayViewProps = {
  message: string;
  children?: React.ReactNode;
};

const { width } = Dimensions.get("screen");
const ErrorDisplayView: React.FC<ErrorDisplayViewProps> = ({
  message,
  ...props
}) => {
  return (
    <Box flex={1} alignSelf={"center"} paddingBottom={"xxl"} mt={"xxxl"}>
      <Box
        flex={1}
        width={width}
        alignItems={"center"}
        justifyContent={"center"}
        zIndex={-10}
       
        paddingBottom={"xxl"}
      >
        <ErrorBG height={200} width={250} />
      </Box>
      <Box
        flex={1}
        alignSelf={"center"}
        padding={"m"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text textAlign={"center"} mb={"ml"} variant={"header"}>
          OOPS, Une erreur s'est produite !{" "}
        </Text>
        <Text color={"danger"} variant={"subheader"} textAlign={"center"}>
          Erreur: {message}
        </Text>
      </Box>
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        {props.children}
      </Box>
    </Box>
  );
};

export default ErrorDisplayView;
