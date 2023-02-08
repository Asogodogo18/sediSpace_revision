import {
  Box,
  MessageHeader,
  Message,
  ReplyField,
  ErrorDisplayView,
  Loader,
  Button,
  EmptyChat,
} from "../../../components";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";

import {
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
  Dimensions,
  Platform,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useChatController from "../../../viewController/Messages/ChatController";
import useMessageController from "../../../viewController/Messages/MessageController";
import { useUserContext } from "../../../Context";
import { toastError } from "../../../utils/toastHandler";
import { filterDeletedMessages } from "../../../utils/filterDeletedChats";

const { height } = Dimensions.get("window");
const isIphone = Platform.OS == "ios";

const Chats = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);
  const [chatId, setChatId] = useState("");
  const [sender, setSender] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [isChatCreated, setIsChatCreated] = useState(false);
  const inputRef = useRef<TextInput>();
  const {
    getSingleChatById,
    createChat,
    isCreationError,
    isCreationLoading,
    isCreationSuccess,
    isCreationUninitialized,
    createChatData,
  } = useChatController();
  const { user } = useUserContext();

  const {
    isSending,
    isSuccess: isSent,
    isError: notSent,
    error: sendingError,
    requestResponse,
    onChangeMessage,
    onSubmitMessage,
    message,
  } = useMessageController();
  // console.log("sending : ", isSending);
  // console.log("isSent: ", isSent);
  // console.log("isErrorSending: ", notSent);
  // console.log("error while sending: ", sendingError);
  // console.log("request res: ", requestResponse?.data?.message);
  console.log("chat data state: ", chatData);
  console.log("focus: ", isFocused);

  useEffect(() => {
    const backAction = () => {
      console.log("back handler");

      setIsFocused(false);
      console.log("changing focus");

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  useEffect(() => {
    if (route.params.chatId !== undefined) {
      fetchChatData(route.params.chatId);
    }
    if (route.params.receiverId !== undefined && !isChatCreated) {
      newChat(route.params.receiverId);
    }
    return () => {
      setChatData([]);
      setSender(null);
      setIsChatCreated(false);
    };
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    if (!chatId) {
      setIsRefreshing(false);
      return;
    } else {
      await fetchChatData(chatId);
      setIsRefreshing(false);
    }
    if (error) setError(null);
  };
  // setInterval(refreshData, 60000);

  const fetchChatData = async (chatID) => {
    setChatId(chatID);
    try {
      const response = await getSingleChatById(chatID);
      console.log("chat by id response mutation : ", response);

      if (response?.code !== 200) throw new Error(response?.message);
      else {
        console.log("setting fetched data");

        setChatData(response.chat);
        setSender(
          response.chat["user_two"].id !== user.id
            ? response.chat["user_two"]
            : response.chat["user_one"]
        );
      }
    } catch (error) {
      toastError(error.toString());
      setError(error.toString());
    }
    setIsLoading(false);
  };

  const newChat = async (receiverId: string) => {
    try {
      const payload = await createChat({ senderId: user.id, receiverId });
      console.log("fulfilled", payload);
      if (payload.code == 200) {
        console.log("\nfetching data after new chat");
        await fetchChatData(payload.chat.id);
      } else throw new Error(response?.message);
    } catch (error) {
      console.log("rejected: ", error);
      setError(error.toString());
    }
    setIsLoading(false);
  };
  const onReplyPress = () => {
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    await onSubmitMessage({ chatId, senderId: user.id });
    fetchChatData(chatId);
  };

  if (isLoading) {
    return (
      <Loader
        sizeSpinner={60}
        message="En cours de chargement, Veuillez Patienter"
      />
    );
  }
  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  if (error) {
    return (
      <ErrorDisplayView message={error}>
        <Button primary title="Actualiser" onPress={refreshData} />
      </ErrorDisplayView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Box flex={1} style={{}}>
          <MessageHeader
            onGoBack={() => navigation.goBack()}
            onMenuPress={() => {}}
            user={sender}
          />
          <ChatContent
            isRefreshing={isRefreshing}
            onRefresh={refreshData}
            onReplyPress={onReplyPress}
            messages={filterDeletedMessages({
              userId: user.id,
              user1: chatData["user_one"].id,
              user2: chatData["user_two"].id,
              chatArray: chatData?.messages?.data,
            })}
            sender={user.id}
          />
        </Box>
        <Box
          width={"100%"}
          style={{
            marginBottom: !isFocused ? 0 : isFocused && isIphone ? 80 : 60,
          }}
        >
          <ReplyField
            ref={inputRef}
            value={message}
            onChange={onChangeMessage}
            onSubmit={handleSubmit}
            placeholder="Votre Message..."
            onFocus={handleFocus}
          />
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ChatContent = ({
  messages,
  sender,
  onReplyPress,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
        height: height - 120,
      }}
      data={_.reverse([...messages])}
      inverted={messages.length > 0 ? true : false}
      renderItem={({ item: message }) => (
        <Message
          onReplyFocus={onReplyPress}
          self={message?.sent_by === sender}
          message={{
            text: message.message,
            media: message.media,
            timestamp: message.time,
            ...message,
          }}
        />
      )}
    />
  );
};

export default Chats;
