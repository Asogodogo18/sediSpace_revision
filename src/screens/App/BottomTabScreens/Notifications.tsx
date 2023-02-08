import React from "react";
import { ScrollView,FlatList } from "react-native";
import { useListUserNotificationsQuery } from "../../../Api/NotificationApi";
import {
  Box,
  Text,
  Post,
  Searchbar,
  SearchFilters,
  MessageListing,
  MainHeader,
  NotificationListing,
  EmptyNotification,
} from "../../../components";
import SingleNotifPreview from "../../../components/Notification/SIngleNotif";
import { useUserContext } from "../../../Context";
import Notify from "../../../data/notify";
import useNotificationController from "../../../viewController/Notifications/NotificationController";

const Notifications = () => {
  const { user } = useUserContext();
  const { getAllUserNotifications } = useNotificationController();
  const { data, isLoading, isFetching, isError, error } =
    getAllUserNotifications(user.id);

  // console.log('notifications: ',data);
  // console.log('notifications status : ',isLoading);
  // console.log('notifications error: ',error);
  const handlePress = () => {};

  const renderItem = ({ item }) => (
    <SingleNotifPreview onPress={()=>{}} {...item} />
  );
  return (
    <>
      <MainHeader title="Notifications" />
      {/* <NotificationListing data={Notify} /> */}
      <EmptyNotification />
      {/* <FlatList
      // bounces
      data={Notify}
      nestedScrollEnabled
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:80}}
      keyExtractor={(item) => item.id}
    /> */}
    </>
  );
};

export default Notifications;
