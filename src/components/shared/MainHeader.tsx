import { TouchableOpacity } from "react-native";
import React from "react";
import Box from "./Box";
import { SimpleLineIcons } from "@expo/vector-icons";
import Text from "./Text";

type MainHeaderProps = {
  title: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
  return (
    <Box
      flexDirection={"row"}
      justifyContent={"space-between"}
      my={"ml"}
      p={"m"}
      maxHeight={80}
      width={'100%'}
      alignItems={'center'}
    >
      <Text variant={"header"}>{title}</Text>
      <TouchableOpacity>
        <SimpleLineIcons name="options" size={24} color="black" />
      </TouchableOpacity>
    </Box>
  );
};

export default MainHeader;
