import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Box from "../shared/Box";
import EmptyUserContent from "../shared/EmptyComponents/EmptyUserContent";

import UserCard from "./UserCard";

type Props = { data: number[] };

const FollowersListing = ({ data }: Props) => {
  return (
    <Box flex={1} height={"100%"} style={{ backgroundColor: "#FFF" }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, height: "100%" }}
        data={data}
        ListEmptyComponent={
          <EmptyUserContent message="cet utilisateur n'a pas d'abonnés" />
        }
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => <UserCard userID={item} />}
      />
    </Box>
  );
};

export default FollowersListing;
