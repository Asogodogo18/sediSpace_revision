import { APP_API } from "./ApiManager";
import { api } from "./rtkApi";

APP_API.createEntity({ name: "users" });

export default APP_API.endpoints.users;

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (payload) => {
        return {
          body: payload,
          method: "POST",
          url: "/user/info",
        };
      },
      providesTags: (_result, _err, id) => [{ type: "Users", id }],
    }),
    getUserFromId: build.mutation({
      query: (payload) => {
        return {
          body: payload,
          method: "POST",
          url: "/user/info",
        };
      },
      providesTags: (_result, _err, id) => [{ type: "Users", id }],
    }),
    updateUser: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: `/user/update`,
      }),
    }),
    updateUserPrivacy: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/update/privacy",
      }),
    }),
    updateUserAvatar: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/update/avatar",
      }),
    }),
    updateUserCover: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/update/cover",
      }),
    }),
    requestPasswordUpdate: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/password/request",
      }),
    }),
    savePasswordUpdate: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/password/save",
      }),
    }),
    updateUserPassword: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/user/update/password",
      }),
    }),
    followUser: build.mutation({
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: arg.id },
        "Posts",
      ],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/user/follow",
      }),
    }),
    unfollowUser: build.mutation({
      invalidatesTags: (result, error, arg) => [
        { type: "Users", id: arg.id },
        "Posts",
      ],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/user/unfollow",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserByIdQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserMutation,
  useUpdateUserCoverMutation,
  useUpdateUserPrivacyMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useSavePasswordUpdateMutation,
  useRequestPasswordUpdateMutation,
  useGetUserFromIdMutation,
  useUpdateUserPasswordMutation,
} = userApi;
