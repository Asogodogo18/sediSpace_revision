import { APP_API } from "./ApiManager";
import { api } from "./rtkApi";

APP_API.createEntity({ name: "messages" });

export default APP_API.endpoints.messages;
export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    sendChatMessage: build.mutation({
      invalidatesTags: (result, error, arg) => [{ type: "Chats", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/chats/message/add",
      }),
    }),
    getMessageById: build.mutation({
      providesTags: (result, error, arg) => [{ type: "Messages", id: arg.id }],
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: `/chats/message/info`,
      }),
    }),
    searchMessage: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/chats/message/search",
      }),
    }),
    deleteMessage: build.mutation({
      invalidatesTags: (result, error, arg) => [
        { type: "Chats", id: arg.id },
        "Messages",
      ],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/chats/message/delete",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useSendChatMessageMutation,
  useDeleteMessageMutation,
  useGetMessageByIdMutation,
  useSearchMessageMutation,
} = chatApi;
