import { TouchableOpacity, View } from "react-native";
import React, { ReactComponentElement, ReactNode, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import Box from "../shared/Box";
import Text from "../shared/Text";

type TabNavProps = {
  isActive: number;
  onSwitch: (param: any) => void;
};

type TabContainerProps = {
  onPress: () => void;
  children: ReactNode;
};

const TabContainer: React.FC<TabContainerProps> = (props) => (
  <TouchableOpacity onPress={props.onPress}>
    <Box
      minWidth={8}
      minHeight={52}
      alignItems={"center"}
      justifyContent={"space-around"}
      flexDirection={"row"}
      mx={"ml"}
    >
      {props.children}
    </Box>
  </TouchableOpacity>
);

const TabNav: React.FC<TabNavProps> = ({ isActive, onSwitch }) => {
  return (
    <Box
      width={320}
      height={50}
      alignSelf={"center"}
      alignItems={"center"}
      justifyContent={"center"}
      backgroundColor="white"
      borderRadius={10}
      flexDirection="row"
      elevation={5}
    >
      <TabContainer onPress={() => onSwitch(0)}>
        <AntDesign
          name="appstore-o"
          size={18}
          color={isActive == 0 ? "green" : "black"}
        />
        <Text
          ml={"s"}
          color={isActive == 0 ? "greenDark" : "black"}
          variant={isActive == 0 ? "btnTextActive" : "btnTextInactive"}
        >
          Médias
        </Text>
      </TabContainer>
      <TabContainer onPress={() => onSwitch(1)}>
        <AntDesign
          name="bars"
          size={18}
          color={isActive == 1 ? "green" : "black"}
        />
        <Text
          ml={"s"}
          color={isActive == 1 ? "greenDark" : "black"}
          variant={isActive == 1 ? "btnTextActive" : "btnTextInactive"}
        >
          Postes
        </Text>
      </TabContainer>
      <TabContainer onPress={() => onSwitch(2)}>
        <AntDesign
          name="hearto"
          size={18}
          color={isActive == 2 ? "green" : "black"}
        />
        <Text
          ml={"s"}
          color={isActive == 2 ? "greenDark" : "black"}
          variant={isActive == 2 ? "btnTextActive" : "btnTextInactive"}
        >
          Aimes
        </Text>
      </TabContainer>
    </Box>
  );
};

export default TabNav;
