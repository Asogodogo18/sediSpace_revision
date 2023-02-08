import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Theme } from "../../../theme.android";
import Box from "../Box";
import Text from "../Text";
import { BallIndicator } from "react-native-indicators";


type FeedFilterProps = {
  onPress?: () => void;
  loading?: boolean;
  isActive: boolean;
  title: string;
  textProps?: TextProps<Theme>;
} & Partial<BoxProps<Theme>>;

const FeedFilter: React.FC<FeedFilterProps> = ({
  title,
  onPress,
  isActive,
  loading,
  textProps,
  ...props
}) => (
  <TouchableOpacity onPress={onPress}>
    {isActive ? (
      <Box
        minWidth={85}
        height={25}
        px="m"
        mx={"m"}
        alignItems={"center"}
        justifyContent="center"
        backgroundColor={"black"}
        borderRadius={10}
        shadowOffset={{ height: 2, width: 0 }}
        shadowRadius={5}
        shadowColor="black"
        shadowOpacity={0.2}
        elevation={4}
        {...props}
      >
        {loading ? (
            <BallIndicator color="green" size={30} animating interaction />

        ) : (
          <Text variant={"btnText4"} {...textProps}>
            {title}
          </Text>
        )}
      </Box>
    ) : (
      <Box
        minWidth={85}
        height={25}
        px="m"
        mx={"s"}
        alignItems={"center"}
        justifyContent="center"
        backgroundColor={"nobg"}
        borderWidth={1}
        borderColor={"grayDark"}
        borderRadius={10}
        {...props}
      >
        {loading ? (
            <BallIndicator color="green" size={30} animating interaction />

        ) : (
          <Text variant={"btnText3"} {...textProps}>
            {title}
          </Text>
        )}
      </Box>
    )}
  </TouchableOpacity>
);

export default FeedFilter;
