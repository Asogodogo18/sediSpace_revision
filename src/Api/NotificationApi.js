import { api } from "./rtkApi";

export const notificationApi = api.injectEndpoints({
  endpoints: (build) => ({
    listUserNotifications: build.query({
      providesTags: ["Notifications"],
      query: (formData) => ({
        body: formData,
        method: "POST",
        url: "/notification",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useListUserNotificationsQuery } = notificationApi;
