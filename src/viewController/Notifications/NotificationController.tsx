import React from "react";
import { useListUserNotificationsQuery } from "../../Api/NotificationApi";

const useNotificationController = () => {
  const getAllUserNotifications = (payload: string) => {
    const formData = new FormData();
    formData.append("user", payload);
    return useListUserNotificationsQuery(formData);
  };

  return { getAllUserNotifications };
};

export default useNotificationController;
