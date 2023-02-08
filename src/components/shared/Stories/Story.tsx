import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Theme } from "../../../theme.android";
import Box from "../Box";

export type UserStoryProps = {
  id: string;
  cover: string;
};

export type StoryProps = {
  onPress?: () => void;
  primary: boolean;
  isOnline: boolean;
  user: UserStoryProps;
} & Partial<BoxProps<Theme>>;

const Story: React.FC<StoryProps> = ({
  onPress,
  user,
  primary,
  isOnline,
  ...props
}) => (
  <Box maxHeight={80}>
    {primary ? (
      <TouchableOpacity onPress={onPress}>
        <Box
          width={45}
          height={45}
          alignItems={"center"}
          justifyContent="center"
          backgroundColor={"nobg"}
          borderRadius={8}
          borderWidth={2}
          overflow={"hidden"}
          borderColor={"borderColor1"}
          {...props}
        >
          <Ionicons name="add" size={38} color="green" />
        </Box>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={{ marginHorizontal: 4 }} onPress={onPress}>
        <Box
          width={45}
          height={45}
          alignItems={"center"}
          justifyContent="center"
          backgroundColor={"nobg"}
          borderRadius={8}
          borderWidth={1}
          overflow={"hidden"}
          borderColor={isOnline ? "borderColor1" : "black"}
          {...props}
        >
          <Image
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            resizeMode="cover"
            source={{ uri: user.cover }}
          />
        </Box>
      </TouchableOpacity>
    )}
  </Box>
);

export default Story;
