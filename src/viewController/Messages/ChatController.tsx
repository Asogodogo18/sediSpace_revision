import { View, Text } from "react-native";
import React, { useState } from "react";

import {
  useGetChatsByUserQuery,
  useCreateChatMutation,
  useDeleteChatMutation,
  // useGetChatByIdMutation,
  useGetChatByIdMutation,
} from "../../Api/ChatsApi";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const useChatController = () => {
  // const
  //   { isError, isLoading, isSuccess, isUninitialized, data: userChatsList },
  // =

  const [
    createChatMutation,
    {
      isError: isCreationError,
      isLoading: isCreationLoading,
      isSuccess: isCreationSuccess,
      isUninitialized: isCreationUninitialized,
      data: createChatData,
    },
  ] = useCreateChatMutation();
  const [getChatById, chatbyIdresponse] = useGetChatByIdMutation();

  // const [
  //   getChatById,
  //   {
  //     isError: isChatError,
  //     isLoading: isChatLoading,
  //     isSuccess: isChatSuccess,
  //     isUninitialized: isChatUninitialized,
  //     data: singleChatData,
  //   },
  // ] = useGetChatByIdMutation();

  const [
    deleteChat,
    {
      isError: isDeletionError,
      isLoading: isDeletionLoading,
      isSuccess: isDeletionSuccess,
      isUninitialized: isDeletionUninitialized,
      data: chatDeleteResponse,
    },
  ] = useDeleteChatMutation();

  // const [isSending, setIsSending] = useState(false);
  // const [status, setStatus] = useState<
  //   "inactive" | "sending" | "sent" | "failed"
  // >("inactive");

  const getUserChats = (userId: string) => {
    const payload = new FormData();
    payload.append("userid", userId);
    return useGetChatsByUserQuery(payload, {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });
  };

  // const getSingleChat = (chatId: string) => {
  //   const payload = new FormData();
  //   payload.append("chatid", chatId);
  //   return getChatById(payload);
  // };

  const getSingleChatById = async (chatId: string) => {
    console.log("chat by id : ", chatId);

    try {
      const payload = new FormData();
      payload.append("chatid", chatId);
      return await getChatById(payload).unwrap();
    } catch (error) {
      toastError(error.toString());
    }
  };

  const onDeleteChat = async (payload: { userId: string; chatId: string }) => {
    console.log("chat deletion: ", payload);

    const formData = new FormData();
    formData.append("userid", payload.userId);
    formData.append("chatid", payload.chatId);

    try {
      const response = await deleteChat({
        data: formData,
        id: payload.chatId,
      }).unwrap();
      if (response?.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const createChat = async (payload: {
    senderId: string;
    receiverId: string;
  }) => {
    const formData = new FormData();
    formData.append("sender_id", payload.senderId);
    formData.append("receiver_id", payload.receiverId);
    return await createChatMutation(formData).unwrap();
  };

  return {
    getUserChats,
    createChat,
    onDeleteChat,
    // getSingleChat,
    // isChatError,
    // isChatLoading,
    // isChatSuccess,
    // isChatUninitialized,
    // singleChatData,
    chatbyIdresponse,
    isCreationError,
    isCreationLoading,
    isCreationSuccess,
    createChatData,
    isCreationUninitialized,
    isDeletionError,
    isDeletionLoading,
    isDeletionSuccess,
    isDeletionUninitialized,
    chatDeleteResponse,
    getSingleChatById,
  };
};

export default useChatController;
