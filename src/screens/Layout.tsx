import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  Easing,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);

const Layout = (props) => {
  const progress = useDrawerProgress();

  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 0.85, 0.7], {
      extrapolateRight: Extrapolate.EXTEND,
    });

    const borderRadius = interpolate(progress.value, [0, 1], [0, 20], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    return { borderRadius, transform: [{ perspective: 100 }, { scale }] };
  });

  return (
    <AnimatedSafeArea style={[styles.stack, screenStyle]}>
      {props.children}
    </AnimatedSafeArea>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: Platform.OS === "ios" ? "center" : null,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: Platform.OS === "android" ? 10 : 50,
    right: 16,
    left: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "lightgreen",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "orange",
  },
  scene: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: "transparent",
  },
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: "hidden",
  },
  transparentHeader: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawerStyles: { flex: 1, width: "80%", backgroundColor: "transparent" },
});
