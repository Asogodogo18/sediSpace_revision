import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import { string } from "prop-types";
import Avatar from "../shared/Avatar";
import Input from "../shared/TextInput";
import Line from "../shared/Line";
import { Platform } from "react-native";

type ThirdStepProps = {
  bio: string;
  onBioChange: (param: string) => void;
  image: string;
} & Partial<BoxProps<Theme>>;

const isIphone = Platform.OS === "ios";

const ThirdStep: React.FC<ThirdStepProps> = ({
  bio,
  onBioChange,
  image,
  ...props
}) => {
  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"} {...props}>
      <Box
        elevation={4}
        zIndex={100}
        alignSelf={"flex-start"}
        left={0}
        bottom={isIphone ? 0 : -40}
      >
        <Avatar type="pinned" source={{ uri: image }} />
      </Box>
      <Box
        ml={"xxxl"}
        zIndex={100}
        alignSelf={"flex-start"}
        left={0}
        bottom={isIphone ? 0 : -40}
      >
        <Text variant={"titleBold"}>Bio</Text>
        <Line alignSelf={"center"} backgroundColor={"black"} width={230} />
      </Box>
      <Input
        placeholder="Veuillez entrer une brève description de vous-même avec un maximum de 140 caractères"
        value={bio}
        onChange={onBioChange}
        height={220}
        px={"xl"}
        borderRadius={10}
      />
    </Box>
  );
};

export default ThirdStep;
