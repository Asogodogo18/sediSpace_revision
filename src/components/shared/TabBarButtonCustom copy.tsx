import React, { useState } from "react";
import { Alert, Animated, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Box from "./Box";
import Text from "./Text";
import { useNavigation } from "@react-navigation/native";

const SIZE = 60;
const AddButton = () => {
  const [isCheck, setIsCheck] = useState(false);
  const navigation = useNavigation();
  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  let mode = new Animated.Value(0);
  const toggleView = () => {
    Animated.timing(mode, {
      toValue: mode._value === 0 ? 1.5 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const firstX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -40],
  });
  const firstY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const secondX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 10],
  });
  const secondY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });
  const thirdX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 55],
  });
  const thirdY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const opacity = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const width = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [65, 40],
  });
  const height = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [65, 40],
  });
  return (
    <AnimatedBox
      style={[
        {
          position: "relative",
          alignItems: "center",
          top: -25,

          borderRadius: 65,
          borderColor: "white",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            height: 5,
            width: 5,
          },
        },
        {
          // height: height,
          // width:  width,
        },
      ]}
    >
      <Animated.View
        style={{
          position: "absolute",
          left: firstX,
          top: firstY,
          opacity,
        }}
      >
        <LinearGradient
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: 65,
            height: 65,
            borderRadius: 50,
            backgroundColor: "green",
          }}
          colors={["#26FFCB", "#1F9354"]}
        >
          <TouchableOpacity onPress={() => Alert.alert("Bientôt disponible")}>
            <Text variant={"title"} color={"white"}>
              Live
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: secondX,
          top: secondY,
          opacity,
        }}
      >
        <LinearGradient
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: 65,
            height: 65,
            borderRadius: 50,
            backgroundColor: "green",
          }}
          colors={["#26FFCB", "#1F9354"]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Accueil", { screen: "PosteScreens" }),
                setIsCheck(true);
            }}
          >
            <Text variant={"title"} color={"white"}>
              Poste
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          left: thirdX,
          top: thirdY,
          opacity,
        }}
      >
        <LinearGradient
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            width: 65,
            height: 65,
            borderRadius: 50,
            backgroundColor: "green",
          }}
          colors={["#26FFCB", "#1F9354"]}
        >
          <TouchableOpacity onPress={() => {}}>
            <Text variant={"title"} color={"white"}>
              Statut
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>

      <AnimatedTouch
        onPress={toggleView}
        style={[
          {
            flex: 1,
          },
        ]}
      >
        <LinearGradient
          style={{
            flex: 1,
            borderRadius: 65,

            width: SIZE,
            height: SIZE,
            justifyContent: "center",
            alignItems: "center",
          }}
          colors={["#26FFCB", "#1F9354"]}
        >
          <Animated.View
            style={{
              transform: [{ rotate: rotation }],
            }}
          >
            <Icon name="plus" size={24} color="#F8F8F8" />
          </Animated.View>
        </LinearGradient>
      </AnimatedTouch>
    </AnimatedBox>
  );
};
export default AddButton;
