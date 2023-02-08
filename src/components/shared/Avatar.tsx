import React from "react";
import { BoxProps,} from "@shopify/restyle";
import {TouchableOpacity, Image, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { Theme } from "../../theme.android";
import Box from "./Box";

import AvatarBg from "../../../assets/SVGCropFiles/Profile-avatar-bg-1.svg";

enum AvatarTypes {
  main,
  header,
  post,
  pinned,
  profile,
  menu,
  floating,
}

const WIDTH = {
  main: 250,
  header: 64,
  post: 45,
  profile: 115,
  pinned: 80,
  floating: 150,
  menu: 100,
};
const HEIGHT = {
  main: 250,
  header: 64,
  post: 45,
  profile: 115,
  pinned: 80,
  floating: 150,
  menu: 100,
};

const RESIZE_RATIO = 0.7071;

type AvatarType = keyof typeof AvatarTypes;

type AvatarProps = {
  onPress?: () => void;
  type: AvatarType;
  source: any;
} & Partial<BoxProps<Theme>>;

const Avatar: React.FC<AvatarProps> = ({ type, onPress, source, ...props }) => {
  const CONTAINER_WIDTH = WIDTH[type];
  const CONTAINER_HEIGHT = HEIGHT[type];
  const IMG_WIDTH = CONTAINER_WIDTH * RESIZE_RATIO;
  const IMG_HEIGHT = CONTAINER_HEIGHT * RESIZE_RATIO;

  const animatedStyles = useAnimatedStyle(() => {
    const borderR = interpolate(CONTAINER_WIDTH, [250, 45], [20, 5], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const width = interpolate(
      CONTAINER_WIDTH,
      [250, 45],
      [IMG_WIDTH - 60*RESIZE_RATIO, IMG_WIDTH - 15*RESIZE_RATIO],
      {
        extrapolateRight: Extrapolate.EXTEND,
      }
    );

    return {
      borderRadius: borderR,
      width,
      height: width,
    };
  });

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <AvatarBg
        style={{
          overflow: "hidden",
          position: "absolute",
          zIndex: -10,
        }}
        width={CONTAINER_WIDTH}
        height={CONTAINER_HEIGHT}
      />
      <Animated.View
        style={[
          {
            width: IMG_WIDTH - 15,
            height: IMG_HEIGHT - 15,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          },
          animatedStyles,
        ]}
      >
        <Image
          source={source}
          style={{
            width: IMG_WIDTH,
            height: IMG_HEIGHT,
            overflow: "hidden",
          }}
          resizeMode="cover"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default Avatar;
