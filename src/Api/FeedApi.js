import { APP_API } from "./ApiManager";

APP_API.createEntity({ name: "feeds" });

export default APP_API.endpoints.feeds;

import { api } from "./rtkApi";

export const feedApi = api.injectEndpoints({
  endpoints: (build) => ({
    listFeed: build.query({
      providesTags: (result) =>
      result?.code==200
        ? [
            ...result?.data.map(({ id }) => ({ type: 'Posts', id })),
            { type: 'Posts', id: 'LIST' },
          ]
        : [{ type: 'Posts', id: 'LIST' }],
      query: (formData) => ({
        body: formData,
        method: "POST",
        url: "/feeds",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useListFeedQuery } = feedApi;
