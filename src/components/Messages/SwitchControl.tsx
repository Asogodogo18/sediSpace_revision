import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Box from "../shared/Box";
import Text from "../shared/Text";

type SwitchControlProps = {
  activeIndex: Number;
  onSwitch: () => void;
};

type ControlProps = {
  activeIndex: boolean;
  label: string;
  handleSwicth: () => void;
};
const SwitchControl: React.FC<SwitchControlProps> = ({
  activeIndex,
  onSwitch,
}) => {
  return (
    <Box
      height={40}
      borderRadius={10}
      backgroundColor={"white"}
      mx={"xl"}
      px={"s"}
      elevation={4}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <Control
        label={"Conversations"}
        activeIndex={activeIndex === 0 ? true : false}
        handleSwicth={onSwitch}
      />
      <Control
        label={"Groupes"}
        activeIndex={activeIndex === 1 ? true : false}
        handleSwicth={onSwitch}
      />
    </Box>
  );
};

const Control: React.FC<ControlProps> = ({
  activeIndex,
  label,
  handleSwicth,
}) => (
  <Box
    height={25}
    backgroundColor={activeIndex ? "borderColor1" : "nobg"}
    borderRadius={5}
    px={"m"}
  >
    <TouchableOpacity
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={handleSwicth}
    >
      <Text variant={activeIndex ? "btnTextActive" : "btnTextInactive"}>
        {label}
      </Text>
    </TouchableOpacity>
  </Box>
);

export default SwitchControl;
