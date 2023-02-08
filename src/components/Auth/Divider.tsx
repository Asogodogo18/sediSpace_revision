import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import Line from "../shared/Line";


type ButtonProps = {
  textProps?: TextProps<Theme>;
} & Partial<BoxProps<Theme>>;

const Button: React.FC<ButtonProps> = ({ textProps, ...props }) => (
  <Box
    width={"100%"}
    flexDirection={"row"}
    justifyContent="space-evenly"
    alignItems={"center"}
  >
    <Line />
    <Text variant={"btnText4"} textTransform="uppercase">
      OU
    </Text>
    <Line />
  </Box>
);

export default Button;
