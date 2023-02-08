import React, { useReducer } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

import Box from "../shared/Box";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

const FeedSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: "#ffff" }}
    >
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        style={{ marginBottom: 15, alignItems: "center" }}
      >
        <Skeleton colorMode={"light"} width={100} height={20} radius="round" />
        <Skeleton colorMode={"light"} width={20} height={15} />
      </Box>
      <Box
        flexDirection={"row"}
        justifyContent={"space-around"}
        style={{ marginBottom: 15 }}
      >
        <Skeleton colorMode={"light"} width={80} height={35} radius="round" />
        <Skeleton colorMode={"light"} width={80} height={35} radius="round" />
        <Skeleton colorMode={"light"} width={80} height={35} radius="round" />
        <Skeleton colorMode={"light"} width={80} height={35} radius="round" />
      </Box>
      <Box
        flexDirection={"row"}
        justifyContent={"space-between"}
        m={"s"}
        mb={"ml"}
      >
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
        <Skeleton colorMode={"light"} width={50} height={45} radius={3} />
      </Box>
      <Box style={{ borderWidth: 0, padding: 5, margin: 5
      ,borderColor:'lightgray',borderRadius:5 }}>
        <Box
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Skeleton colorMode={"light"} width={60} height={60} radius="round" />
          <Box style={{ marginLeft: 0 }}>
            <Skeleton colorMode={"light"} width={150} height={15} />
            <Spacer height={5} />
            <Skeleton colorMode={"light"} width={125} height={15} />
          </Box>
          <Box style={{ marginLeft: 90 }}>
            <Skeleton colorMode={"light"} width={20} />
          </Box>

          <Spacer height={10} />
        </Box>
        <Box mt={"m"}>
          <Skeleton
            colorMode={"light"}
            width={"75%"}
            height={20}
            radius="round"
          />
          <Spacer height={2} />

          <Skeleton
            colorMode={"light"}
            width={"65%"}
            height={20}
            radius="round"
          />
          <Spacer height={2} />

          <Skeleton
            colorMode={"light"}
            width={"60%"}
            height={20}
            radius="round"
          />
          <Spacer height={2} />

          <Skeleton
            colorMode={"light"}
            width={"55%"}
            height={20}
            radius="round"
          />
          <Spacer height={2} />

          <Skeleton
            colorMode={"light"}
            width={"50%"}
            height={20}
            radius="round"
          />
        </Box>

        <Box flexDirection={"row"} justifyContent={"space-between"} m={"l"}>
          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />

          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />
          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />
        </Box>
      </Box>

      <Box style={{ borderWidth: 0, padding: 5, margin: 5 ,borderColor:'lightgray',borderRadius:5 }}>
        <Box
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <Skeleton colorMode={"light"} width={60} height={60} radius="round" />
          <Box style={{ marginLeft: 0 }}>
            <Skeleton colorMode={"light"} width={150} height={15} />
            <Spacer height={5} />
            <Skeleton colorMode={"light"} width={125} height={15} />
          </Box>
          <Box style={{ marginLeft: 90 }}>
            <Skeleton colorMode={"light"} width={20} />
          </Box>

          <Spacer height={10} />
        </Box>
        <Box alignSelf={"center"} alignItems={"center"} mt={"m"}>
          <Skeleton colorMode={"light"} width={"95%"} height={120} />
        </Box>
        <Box marginLeft={"m"}>
          <Spacer height={6} />
          <Skeleton colorMode={"light"} width={"80%"} height={15} radius={5} />
          <Spacer height={2} />

          <Skeleton colorMode={"light"} width={"70%"} height={15} radius={5} />
          <Spacer height={2} />

          <Skeleton colorMode={"light"} width={"60%"} height={15} radius={5} />
        </Box>

        <Box flexDirection={"row"} justifyContent={"space-between"} m={"l"}>
          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />

          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />
          <Skeleton colorMode={"light"} width={80} height={30} radius="round" />
        </Box>
      </Box>
    </MotiView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  padded: {
    padding: 5,
  },
});

export default FeedSkeleton;
