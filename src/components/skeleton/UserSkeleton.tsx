import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import Box from "../shared/Box";

const { width } = Dimensions.get("screen");

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const UserSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: "#fff" }}
    >
      <Box
      flex={1}
        flexDirection={"row"}
        justifyContent={"space-between"}
        style={{
          alignItems: "center",
          padding: 5,
          borderRadius: 5,
          margin: 1.5,
        }}
      >
        <Skeleton colorMode={"light"} width={60} height={60} radius="round" />
        <Box style={{ marginLeft: -40 }}>
          <Skeleton
            colorMode={"light"}
            width={190}
            height={15}
            radius="round"
          />
          <Spacer height={3} />
          <Skeleton colorMode={"light"} width={175} height={10} />
        </Box>
        <Skeleton colorMode={"light"} width={20} height={15} />
      </Box>
    </MotiView>
  );
};
const styles = StyleSheet.create({
  container: {
    width,
    height: 80,
    marginVertical: 2,
    // justifyContent: "center",
    backgroundColor: "black",
  },
  padded: {
    padding: 5,
  },
});

export default UserSkeleton;
