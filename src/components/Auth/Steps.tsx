import React, { useEffect, useState } from "react";
import {
  Button,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const status = ["1", "2", "3", "4", "5"];
const activeColor = "#444";

export default function StepsIndicator({ activeIndex }) {
  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
  };

  useEffect(() => {
    onPress();
    return () => {};
  }, [activeIndex]);

  const marginLeft =
    -(100 - (100 / (status.length - 1)) * activeIndex - 100) + "%";

  return (
    <View style={styles.constainer}>
      {/* <Text style={styles.prop}>{activeIndex}</Text> */}
      <View style={styles.statusContainer}>
        <View style={styles.line}>
          <View style={[styles.activeLine, { height: marginLeft }]} />
        </View>
        {status.map((status, index) => (
          <View
            style={[
              styles.dot,
              index == activeIndex && styles.activeDot,
              index < activeIndex && styles.pastDot,
            ]}
            key={status}
          >
            <Text
              style={[
                index <= activeIndex
                  ? { fontWeight: "bold", fontSize: 12, color: "white" }
                  : { fontWeight: "500", fontSize: 12, color: "black" },
              ]}
            >
              {status}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 70,
    height: 325,
    justifyContent: "space-between",
  },
  dot: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "transparent",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  activeDot: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "#04E851",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFF",
    borderWidth: 4,
    elevation: 5,
  },
  pastDot: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "#0436E8",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFF",
    borderWidth: 4,
  },
  line: {
    height: "100%",
    width: 2,
    backgroundColor: "transparent",
    position: "absolute",
    borderRadius: 5,
    // overflow: "hidden",
  },
  activeLine: {
    height: "100%",
    width: 4,
    backgroundColor: "black",
    borderRadius: 5,
    alignSelf: "center",
  },
  btns: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  labelContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
  },
  prop: {
    marginBottom: 20,
    width: 100,
    textAlign: "center",
  },
});
