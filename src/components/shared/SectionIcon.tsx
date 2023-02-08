import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import Box from "./Box";
import Text from "./Text";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Foundation from "@expo/vector-icons/Foundation";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export const Icons = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
  Entypo,
  SimpleLineIcons,
  Octicons,
  Foundation,
  EvilIcons,
};

type SectionIconProps = {
  iconName: string;
  color: string;
  size: number;
  placeholder: string;
  onPress: () => void;
};

const SectionIcon: React.FunctionComponent<SectionIconProps> = ({
  iconName,
  color,
  size,
  placeholder,
  onPress,
}) => {
  const fontSize = 24;
  // const Tag = type;
  const Default = "gray";
  const condition = iconName;

  // //console.log(type);
  return (
    <Box width={"100%"}>
      <TouchableOpacity
        onPress={onPress}
        style={{ flexDirection: "row", height: 60, alignItems: "center" }}
      >
        {condition &&
          <AntDesign
            name={iconName}
            size={size || fontSize}
            color={color || Default}
          />
        }
        <Text variant={Platform.OS==='ios'? "btnText2":"subheader"} marginLeft={"ml"}>
          {placeholder}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default SectionIcon;
