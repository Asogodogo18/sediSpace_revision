import { View } from "react-native";
import React from "react";

import { BlurView } from "expo-blur";
import Text from "../shared/Text";
import Box from "../shared/Box";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";

type BannerProps = {
  subTitle: string;
  step: number;
} & Partial<BoxProps<Theme>>;

const Banner: React.FC<BannerProps> = ({ subTitle, step, ...props }) => {
  return (
    <Box {...props}>
      <BlurView
        intensity={80}
        tint="dark"
        style={{
          width: "100%",
          height: 90,
          alignItems: "center",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <Text textAlign={"center"} variant={"titleBold1"}>
          Veuillez compléter votre Profil
        </Text>
        <Box flexDirection={"row"} px={"s"} alignItems={"center"}>
          <Text variant={"title2"}>Etape {step} sur 5 : </Text>
          <Text variant={"btnText3"} color={"white"}>
            {subTitle}
          </Text>
        </Box>
      </BlurView>
    </Box>
  );
};

export default Banner;
