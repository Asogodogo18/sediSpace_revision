import React from "react";
import { Platform } from "react-native";
import Box from "../Box";
import Text from "../Text";

type Props = {
  bgComponent: React.ReactNode;
  children?: React.ReactNode;
  message?: string;
};

const Layout = (props: Props) => {
  return (
    <Box flex={1} alignSelf={"center"}>
      <Box
        flex={1}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={-10}
      >
        {props.bgComponent}
      </Box>
      <Box
        position={"absolute"}
        top={0}
        bottom={0}
        left={0}
        right={0}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        zIndex={10}
      >
        <Box
          position={"absolute"}
          // top={80}
          alignSelf={"center"}
          px={"l"}
          borderRadius={10}
          height={80}
          width={Platform.OS ==='ios'? "90%":"85%"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor="darkOverlay"
        >
          <Text
            color={"white"}
            variant={"title1"}
            mb={"ml"}
            textAlign={"center"}
          >
            {props.message}
          </Text>
        </Box>
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
