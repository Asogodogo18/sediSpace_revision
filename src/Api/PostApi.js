import { APP_API } from "./ApiManager";
import { api } from "./rtkApi";

APP_API.createEntity({ name: "posts" });

export default APP_API.endpoints.posts;

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    addPost: build.mutation({
      invalidatesTags: ["Feeds", "Posts"],
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/posts/create",
      }),
    }),
    getAllPosts: build.mutation({
      providesTags: (result) =>
        // {
        //   console.log("query chats by user result : ", result);
        //   return [{ type: "Chats", id: "LIST" }];
        // },
        result?.status == 200
          ? [
              ...result?.data.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/posts",
      }),
    }),
    postsByUser: build.mutation({
      providesTags: (result, error, arg) => [{ type: "UserPosts", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: `/posts/user`,
      }),
    }),
    likeUnlikePost: build.mutation({
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/posts/like_unlike",
      }),
    }),
    repost: build.mutation({
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/posts/repost",
      }),
    }),
    bookmarksUnbookmarksPost: build.mutation({
      query: (payload) => ({
        body: payload,
        method: "POST",
        url: "/posts/bookmarks_unbookmarks",
      }),
    }),
    postsById: build.query({
      providesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/posts/info",
      }),
    }),
    deletePost: build.mutation({
      invalidatesTags: (result, error, arg) => [{ type: "Posts", id: arg.id }],
      query: (payload) => ({
        body: payload.data,
        method: "POST",
        url: "/posts/delete",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddPostMutation,
  useGetAllPostsMutation,
  useBookmarksUnbookmarksPostMutation,
  useDeletePostMutation,
  usePostsByUserMutation,
  usePostsByIdQuery,
  useLikeUnlikePostMutation,
  useRepostMutation,
} = postApi;
