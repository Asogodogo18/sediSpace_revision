import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { PostApi } from "../../Api";
import {
  useAddPostMutation,
  useBookmarksUnbookmarksPostMutation,
  useLikeUnlikePostMutation,
  usePostsByIdQuery,
  usePostsByUserMutation,
  useDeletePostMutation,
  useRepostMutation,
} from "../../Api/PostApi";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { getActiveRouteMetadata } from "../../utils/getActiveScreen";

const usePostController = () => {
  const navigation = useNavigation();
  const navState = useNavigationState((state) => state);

  const CurrentRoute = useCallback(() => {
    const active = getActiveRouteMetadata(navState);
    console.log("nav state: ", active);

    return active;
  }, []);

  const [addPost, { isLoading, isError, error, isSuccess, data }] =
    useAddPostMutation();
  const [postsByUser, { isLoading: isGettingUserPost }] =
    usePostsByUserMutation();
  const [repostPost, repostResponse] = useRepostMutation();
  const [
    bookmarksUnbookmarksPost,
    {
      isLoading: isBooking,
      isError: isBookingError,
      error: bookingError,
      isSuccess: isBookingSuccess,
      data: bookingData,
    },
  ] = useBookmarksUnbookmarksPostMutation();

  const [
    deletePost,
    {
      isLoading: isDeletingPost,
      isError: isDeletePostError,
      error: deletePostError,
      isSuccess: isPostDeleteSuccess,
      data: postDeleteData,
    },
  ] = useDeletePostMutation();
  const [
    likeUnlikePost,
    {
      isLoading: isLiking,
      isError: likingError,
      error: errorLike,
      isSuccess: isLikingSuccess,
      data: likeData,
    },
  ] = useLikeUnlikePostMutation();

  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");

  const handleCommentChange = (text: string) => {
    setComment(text);
  };

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const getPostById = (id: any) => {
    //console.log("query: ", id);
    const payload = new FormData();
    payload.append("id", id);
    return usePostsByIdQuery(
      { data: payload, id },
      { refetchOnMountOrArgChange: true }
    );
  };

  const getPostByUser = (id: any) => {
    //console.log("query: ", id);
    const data = new FormData();
    data.append("user", id);
    return postsByUser({ data, id }).unwrap();
  };

  const createPost = async (payload: FormData) => {
    try {
      const response = await addPost(payload).unwrap();      
      console.log("new post response: ", response);

      if (response?.status !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        navigation.goBack();
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const likePost = async (payload: {
    userID: string | Blob;
    postID: string | Blob;
  }) => {
    const { userID, postID } = payload;
    const formData = new FormData();
    formData.append("user", userID);
    formData.append("post", postID);
    try {
      const response = await likeUnlikePost({
        data: formData,
        id: postID,
      }).unwrap();
      console.log("like response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const savePost = async (payload: {
    userID: string | Blob;
    postID: string | Blob;
  }) => {
    const { userID, postID } = payload;
    const formData = new FormData();
    formData.append("user", userID);
    formData.append("post", postID);

    try {
      const response = await bookmarksUnbookmarksPost(formData);
      console.log("bookmark response: ", response);

      if (response?.data.code !== 200) {
        throw new Error(response?.data.message);
      } else {
        toastSuccess(response?.data.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const rePost = async (payload: {
    userID: string | Blob;
    postID: string | Blob;
  }) => {
    console.log("repost payload: ", payload);

    const { userID, postID } = payload;
    const formData = new FormData();
    formData.append("user", userID);
    formData.append("post", postID);
    try {
      const response = await repostPost({
        data: formData,
        id: postID,
      }).unwrap();
      console.log("repost response: ", response);

      if (response.status !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const editPost = (payload) => {
    //TODO update post data with payload
  };

  const deletePostMutation = async (payload: {
    userID: string | Blob;
    postID: string | Blob;
  }) => {
    const currentScreen = CurrentRoute();
    const formData = new FormData();
    formData.append("user", payload.userID);
    formData.append("post", payload.postID);
    try {
      const response = await deletePost({
        data: formData,
        id: payload.postID,
      }).unwrap();
      console.log("post delete response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        if (currentScreen.name === "Publication") navigation.goBack();
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const flagPost = (payload) => {
    //TODO transaction data with payload
  };

  const newComment = async (payload) => {
    try {
      const response = await addPost(payload).unwrap();
      console.log("like response: ", response);

      if (response?.status !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        handleCommentChange("");
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const editComment = (payload) => {
    //TODO update comment data with payload
  };

  const deleteComment = (payload) => {
    //TODO update comment data with payload
  };

  const flagComment = (payload) => {
    //TODO update comment data with payload
  };

  return {
    getPostByUser,
    getPostById,
    message,
    comment,
    handleCommentChange,
    handleMessageChange,
    createPost,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    newComment,
    likePost,
    isLiking,
    likingError,
    errorLike,
    isLikingSuccess,
    likeData,
    deletePostMutation,
    deleteComment,
    isPostDeleteSuccess,
    isDeletingPost,
    isDeletePostError,
    postDeleteData,
    savePost,
    isBooking,
    isBookingError,
    bookingError,
    isBookingSuccess,
    bookingData,
    rePost,
  };
};

export default usePostController;
