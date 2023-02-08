import { FlatList,VirtualizedList } from "react-native";
import React, { useCallback } from "react";
import { SingleNotifPreviewProps } from "../../types/global";
import { useNavigation } from "@react-navigation/native";
import SingleNotifPreview from "./SIngleNotif";

type NotificationListingProps = {
  data: SingleNotifPreviewProps[];
  id:number
  name:string
};

const NotificationListing: React.FC<NotificationListingProps> = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = () => {};

  const renderItem = ({ item }) => (
    <SingleNotifPreview onPress={handlePress} {...item} />
  );

  return (
    <FlatList
      // bounces
      data={data}
      nestedScrollEnabled
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:80}}
      keyExtractor={(item) => item.id}
    />
  );
};

export default NotificationListing;
