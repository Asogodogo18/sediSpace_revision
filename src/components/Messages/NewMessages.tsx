import React from "react";
import { Image, TouchableOpacity } from "react-native";
import Avatar from "../shared/Avatar";
import Box from "../shared/Box";
import Text from "../shared/Text";

const Pill = () => {
  return (
    <Box
      backgroundColor={"borderColor1"}
      borderRadius={10}
      width={10}
      height={10}
      position={"relative"}
      right={15}
      top={25}
    />
  );
};

const NewMessage = ({ data, onPress }) => {
  console.log("search result item : ", data);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        margin: 8,
      }}
    >
      <Avatar type="header" source={{ uri: data?.avatar }} />
      {/* <Image
          source={}
          style={{ height: 60, width: 60, borderRadius: 50 }}
          resizeMode="cover"
        /> */}
      {data?.isnect && <Pill />}
      <Box marginLeft={"ml"}>
        <Text variant={"title"}>
          {data?.fname} {data?.lname}
        </Text>
        <Text variant={"caption"}>{data?.username}</Text>
      </Box>
    </TouchableOpacity>
  );
};

export default NewMessage;
