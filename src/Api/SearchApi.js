import { APP_API } from "./ApiManager";

APP_API.createEntity({ name: "feeds" });

export default APP_API.endpoints.feeds;

import { api } from "./rtkApi";

export const searchApi = api.injectEndpoints({
  endpoints: (build) => ({
    searchUser: build.mutation({
      // providesTags: ["searchUser"],
      query: (q) => `/search/user/${q}`,
    }),
  }),
  overrideExisting: true,
});

export const { useSearchUserMutation } = searchApi;
