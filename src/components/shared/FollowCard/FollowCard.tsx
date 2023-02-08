import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import Box from "../Box";
import Text from "../Text";

type FollowCardProps = {};

const FollowCard: React.FC<FollowCardProps> = () => {
  return (
    <Box margin={'s'}>
      <Box
        width={160}
        height={160}
        borderRadius={20}
        justifyContent={"center"}
        alignItems={"center"}
        elevation={4}
        backgroundColor={"white"}
        overflow={"hidden"}
      >
        <ImageBackground
          source={require("../../../../assets/Auth/bg.png")}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 66,
            overflow: "hidden",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
          }}
        />
        <Box
          width={64}
          height={64}
          borderRadius={60}
          borderWidth={3}
          borderColor={"white"}
          elevation={4}
          overflow={'hidden'}
        >
          <Image
            source={{ uri: "https://st.depositphotos.com/1008939/2240/i/450/depositphotos_22408839-stock-photo-serious.jpg" }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          />
        </Box>
        <Text marginTop={"s"} variant={"title"}>
          FollowCard
        </Text>
        <Text variant={"subtitle"}>@Follow</Text>
      </Box>
      <TouchableOpacity
        style={{
            width:160,
          position: "absolute",
          alignSelf: "center",
          left: 0,
          bottom: -12.5,
          right: 0,
        }}
      >
        <Box
          width={80}
          height={25}
          borderRadius={20}
          flexDirection={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          alignSelf={'center'}
          backgroundColor={"greenDark"}
        >
          <Ionicons name="add" size={18} color="white" />
          <Text variant={"btnText4"}>Suivre</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default FollowCard;
