import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getDataObject } from "../services/storage";
import { USER_KEY } from "../constants/general-constants";
import { API_URL } from "../constants/api-constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL, // e.g. https://yourapi.com
    prepareHeaders: async (headers) => {
      const user = await getDataObject(USER_KEY);
      const hasUser = !!user && !!user?.userToken;

      if (hasUser) {
        headers.set("Authorization", `Bearer ${user.userToken}`);
      }

      headers.set("Content-Type", "multipart/form-data");

      return headers;
    },
  }),
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: [
    "Social",
    "Posts",
    "UserPosts",
    "Feeds",
    "Notifications",
    "Messages",
    "Chats",
    "Users",
    "ChatsId",
  ],
});
