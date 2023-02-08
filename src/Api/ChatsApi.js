import { APP_API } from "./ApiManager";
import { api } from "./rtkApi";

APP_API.createEntity({ name: "chats" });

export default APP_API.endpoints.chats;

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    createChat: build.mutation({
      invalidatesTags: ["Chats"],
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/chats/add",
      }),
    }),
    getChatsByUser: build.query({
      providesTags: (result) =>
        // {
        //   console.log("query chats by user result : ", result);
        //   return [{ type: "Chats", id: "LIST" }];
        // },
        result?.code == 200
          ? [
              ...result?.chats.map(({ id }) => ({ type: "Chats", id })),
              { type: "Chats", id: "LIST" },
            ]
          : [{ type: "Chats", id: "LIST" }],
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: `/chats/user`,
      }),
    }),
    getChatById: build.mutation({
      providesTags: (result) =>
        result.code == 200
          ? [{ type: "Chats", id: result.chat.id }]
          : [{ type: "Chats", id: "LIST" }],
      //  (result) => {
      //   console.log("query chat by id result : ", result);
      //   return [{ type: "Chats", id: "LIST" }];
      // },
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/chats/info",
      }),
    }),
    deleteChat: build.mutation({
      invalidatesTags: (result, error, arg) => [{ type: "Chats", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/chats/delete",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateChatMutation,
  useDeleteChatMutation,
  useGetChatsByUserQuery,
  useGetChatByIdMutation,
} = chatApi;
