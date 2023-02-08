import { Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Octicons,
} from "@expo/vector-icons";

import Box from "../shared/Box";
import Text from "../shared/Text";
import { SingleNotifPreviewProps } from "../../types/global";

const NOTIF_ICON_SIZE = 12;
const ICON_COLOR = "white";

const NOTIF_ICONS = {
  friends: (
    <FontAwesome5
      name="user-friends"
      size={NOTIF_ICON_SIZE}
      color={ICON_COLOR}
    />
  ),
  post: (
    <MaterialCommunityIcons
      name="post"
      size={NOTIF_ICON_SIZE}
      color={ICON_COLOR}
    />
  ),
  message: (
    <AntDesign name="message1" size={NOTIF_ICON_SIZE} color={ICON_COLOR} />
  ),
  story: <Octicons name="video" size={NOTIF_ICON_SIZE} color={ICON_COLOR} />,
  suggest: (
    <AntDesign name="pushpino" size={NOTIF_ICON_SIZE} color={ICON_COLOR} />
  ),
};

const SingleNotifPreview: React.FC<SingleNotifPreviewProps> = ({
  thumbnail,
  timestamp,
  text,
  onPress,
  type,
}) => {
  return (
    <Box
      flexDirection={"row"}
      height={80}
      width={"100%"}
      backgroundColor={"white"}
      alignItems={"center"}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box flex={2} justifyContent={"center"} alignItems={"center"}>
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              overflow: "hidden",
            }}
          />
          <Box
            height={25}
            width={25}
            position={"absolute"}
            right={-5}
            bottom={-10}
            borderRadius={30}
            backgroundColor={"black"}
            justifyContent={"center"}
            alignItems={"center"}
            elevation={4}
          >
            {NOTIF_ICONS[type]}
          </Box>
        </Box>
        <Box flex={6} ml={"l"} alignItems={"center"}>
          <Text variant={"caption"}>{text}</Text>
        </Box>
        <Box
          flex={2}
          py={"m"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Text variant={"caption"}>{timestamp}</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default SingleNotifPreview;

const Pill = () => {
  return (
    <Box
      backgroundColor={"borderColor1"}
      borderRadius={10}
      width={10}
      height={10}
    />
  );
};
