import { FlatList, RefreshControl } from "react-native";
import React from "react";
import SingleChat from "../../components/Messages/SingleChat";

import EmptyChat from "../shared/EmptyComponents/EmptyChat";

type MessageListingProps = {
  data: any;
  states: any;
  refetchChats?: () => void;
};

const MessageListing: React.FC<MessageListingProps> = ({
  data,
  states,
  refetchChats,
}) => {
  const { isLoading, isError, isFetching, isSuccess, isUninitialized, error } =
    states;

  // if (isLoading || isFetching || isUninitialized) {
  //   return <Loader sizeSpinner={50} message="En cours de chargement, Veuillez Patienter" />;
  // }

  const renderItem = ({ item }) => (
    <SingleChat triggerRefetch={refetchChats} chatId={item.id} />
  );

  return (
    <FlatList
      bounces
      data={data}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetchChats} />
      }
      ListEmptyComponent={EmptyChat}
      nestedScrollEnabled
      // contentContainerStyle={{height:'100%'}}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MessageListing;
