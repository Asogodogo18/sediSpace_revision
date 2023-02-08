import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  useDeleteMessageMutation,
  useSendChatMessageMutation,
} from "../../Api/MessageApi";
import { useUserContext } from "../../Context";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { useNavigation } from "@react-navigation/native";

const useMessageController = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [
    sendChatMessage,
    {
      isLoading: isSending,
      isError,
      isSuccess,
      isUninitialized,
      error,
      data: requestResponse,
    },
  ] = useSendChatMessageMutation();
  const [deleteChatMessage, { isLoading }] = useDeleteMessageMutation();

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "inactive" | "sending" | "sent" | "failed"
  >("inactive");

  const onChangeMessage = (text) => {
    setMessage(text);
  };

  const onDeleteMessage = async (payload: { id: string; chatId: string }) => {
    const { chatId, id } = payload;
    console.log("message Id: ", id);

    const formdata = new FormData();
    formdata.append("userid", user.id);
    formdata.append("messageid", id);
    try {
      const response = await deleteChatMessage({
        data: formdata,
        id: chatId,
      }).unwrap();
      console.log("del response: ", response);

      if (response?.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess("Message supprimé");
      }
    } catch (error) {
      toastError(error.toString());
    }
  };
  const onSubmitMessage = async (payload: {
    chatId: string;
    senderId: string;
  }) => {
    setStatus("sending");
    console.log("controller chat \n");

    console.log("chatId: ", payload.chatId);
    console.log("senderId: ", payload.senderId);

    const formdata = new FormData();
    formdata.append("chat_id", payload.chatId);
    formdata.append("sent_by", payload.senderId);
    formdata.append("message", message);

    console.log("message: ", message);

    try {
      const response = await sendChatMessage({
        data: formdata,
        id: payload.chatId,
      }).unwrap();
      console.log("send response: ", response);
      console.log("send response message: ", response.data.message);

      if (response?.code !== 200) {
        throw new Error(response?.data.message);
      } else {
        toastSuccess(response?.message);
      }
    } catch (error) {
      toastError(error.toString());
    }

    //cleanup
    setMessage("");
  };

  return {
    message,
    onChangeMessage,
    onSubmitMessage,
    onDeleteMessage,
    isSending,
    isSuccess,
    isError,
    isUninitialized,
    error,
    requestResponse,
  };
};

export default useMessageController;
