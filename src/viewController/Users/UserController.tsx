import React, { useEffect, useState } from "react";
import {
  useGetUserByIdQuery,
  useGetUserFromIdMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUpdateUserPasswordMutation,
  useUpdateUserAvatarMutation,
  useUpdateUserCoverMutation,
} from "../../Api/UserApi";
import { useUserContext } from "../../Context";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useUserController = () => {
  const [getUser, { isLoading, isSuccess }] = useGetUserFromIdMutation();
  const [followUserMutation, data] = useFollowUserMutation();
  const [unfollowUserMutation, respData] = useUnfollowUserMutation();
  const [userRefetchTrigger, setUserRefetchTrigger] = useState(false);
  const [updatePassword] = useUpdateUserPasswordMutation();
  const [updateAvatar] = useUpdateUserAvatarMutation();
  const [updateCover] = useUpdateUserCoverMutation();

  const { user } = useUserContext();

  const getUserById = (id: string) => {
    // console.log('user query fired \n');
    const payload = new FormData();
    payload.append("id", id);
    return useGetUserByIdQuery(payload);
  };

  const getUserFromId = async (id: string) => {
    console.log("user mutation fired \n");

    const payload = new FormData();
    payload.append("id", id);
    return await getUser(payload).unwrap();
  };

  const followUser = async (payload: { userID: string | Blob }) => {
    setUserRefetchTrigger(!userRefetchTrigger);
    console.log("refetch on press: ", userRefetchTrigger);

    const { userID } = payload;
    const formData = new FormData();
    formData.append("user_1", user.id);
    formData.append("user_2", userID);
    try {
      const response = await followUserMutation({
        data: formData,
        id: userID,
      }).unwrap();
      console.log("follow response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const unfollowUser = async (payload: { userID: string | Blob }) => {
    setUserRefetchTrigger(!userRefetchTrigger);
    console.log("refetch on press: ", userRefetchTrigger);

    const { userID } = payload;
    const formData = new FormData();
    formData.append("user_1", user.id);
    formData.append("user_2", userID);
    try {
      const response = await unfollowUserMutation({
        data: formData,
        id: userID,
      }).unwrap();
      console.log("unfollow response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const updateUserPassword = async (payload: { password: string }) => {
    const formData = new FormData();
    formData.append("mot_passe", payload.password);
    formData.append("id", user.id);
    try {
      const response = await updatePassword(formData).unwrap();
      if (response.status !== 200) throw new Error(response?.message);
      else toastSuccess(response?.message);
    } catch (error) {
      toastError(error?.toString());
    }
  };

  const updateUserAvatar = async (file: string) => {
    const formData = new FormData();
    let filename = file.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("id", user.id);
    formData.append("avatar", { uri: file, name: filename, type });

    try {
      const response = await updateAvatar(formData).unwrap();
      console.log("avatar response: ", response);

      if (response.status !== 200) throw new Error(response.message);
      else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const updateUserCover = async (file: string) => {
    const formData = new FormData();
    let filename = file.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append("id", user.id);
    formData.append("cover", { uri: file, name: filename, type });

    try {
      const response = await updateCover(formData).unwrap();
      console.log("cover response: ", response);

      if (response.status !== 200) throw new Error(response.message);
      else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  return {
    getUserById,
    getUserFromId,
    followUser,
    unfollowUser,
    userRefetchTrigger,
    updateUserPassword,
    updateUserAvatar,
    updateUserCover,
  };
};

export default useUserController;
