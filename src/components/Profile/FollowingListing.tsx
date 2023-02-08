import React from "react";
import { FlatList } from "react-native";
import Box from "../shared/Box";
import EmptyUserContent from "../shared/EmptyComponents/EmptyUserContent";
import UserCard from "./UserCard";

type Props = { data: number[] };

const FollowingListing = ({ data }: Props) => {
  return (
    <Box flex={1} height={"100%"} style={{ backgroundColor: "#FFF" }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, height: "100%" }}
        ListEmptyComponent={
          <EmptyUserContent message="cet utilisateur n'a pas d'abonnements" />
        }
        data={data}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <UserCard userID={item} />}
      />
    </Box>
  );
};

export default FollowingListing;
