import React, { useState } from "react";
import { Alert, Animated, Platform, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Box from "./Box";
import Text from "./Text";
import { useNavigation, useRoute } from "@react-navigation/native";

const SIZE = 60;
const FabBoutton = () => {
  const navigation = useNavigation();
  const navState = navigation.getState();
  ////console.log("nav state: ", navState);

  const [isCheck, setIsCheck] = useState(false);
  const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
  const AnimatedBox = Animated.createAnimatedComponent(Box);

  let mode = new Animated.Value(0);
  const toggleView = () => {
    // Animated.timing(mode, {
    //   toValue: mode._value === 0 ? 1.5 : 0,
    //   duration: 300,
    //   useNativeDriver: false,
    // }).start();

    if (navState.index === 3) {
      navigation.navigate("Accueil", { screen: "NewMessage" }),
        setIsCheck(true);
      return;
    }
    navigation.navigate("Accueil", { screen: "PosteScreens" }),
      setIsCheck(true);
  };

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  return (
    <AnimatedBox
      style={[
        {
          position: "absolute",
          alignItems: "center",
          bottom:30,
          height:60,
          right:15,

          borderRadius: 65,
          borderColor: "white",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            height: 5,
            width: 5,
          },
        },
      ]}
    >
      

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
export default FabBoutton;
