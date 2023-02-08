import React from "react";
import { TouchableOpacity } from "react-native";
import Box from "./Box";
import Text from "./Text";

type SectionHeaderProps = {
  title: string;
  more: boolean;
  link?: () => void;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  more = false,
  link,
}) => {
  return (
    <Box
      height={40}
      width={"100%"}
      px={"s"}
      alignItems={"center"}
      flexDirection={"row"}
      justifyContent={more ? "space-between" : "flex-start"}
    >
      <Text
        textAlign={"left"}
        textTransform={"capitalize"}
        fontSize={16}
        variant={"subtitle"}
      >
        {title}
      </Text>
      {more && (
        <TouchableOpacity
          style={{ height: 30, width: 60, justifyContent: "center" }}
          onPress={link}
        >
          <Text variant={"subtitle"}>Voir Plus</Text>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default SectionHeader;
