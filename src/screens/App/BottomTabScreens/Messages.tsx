import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";
import {
  Box,
  Searchbar,
  Text,
  SwitchControl,
  Stories,
  MessageListing,
  SectionHeader,
  MainHeader,
  ErrorDisplayView,
  MsgSkeleton,
  EmptyChat,
} from "../../../components";
import FollowingList from "../../../data/stories";
import { useUserContext } from "../../../Context";
import useChatController from "../../../viewController/Messages/ChatController";
import { filterDeletedChats } from "../../../utils";
import { EMPTY_CHAT_RES } from "../../../constants/general-constants";
const { width, height } = Dimensions.get("screen");

const Messages = () => {
  const [chatData, setChatData] = useState([]);
  const { getUserChats } = useChatController();
  const { user } = useUserContext();
  const [isActive, setisActive] = useState(0);

  const {
    isLoading,
    isError,
    isFetching,
    isSuccess,
    isUninitialized,
    error,
    data,
    refetch,
  } = getUserChats(user?.id);

  useEffect(() => {
    if (data && data?.code == 200) {
      const chats = filterDeletedChats(user?.id, data.chats);
      setChatData(chats);
    }

    return () => {
      setChatData([]);
    };
  }, [data, isLoading, isFetching]);

  const refetchChat = async () => {
    console.log("is refreshing");

    const payload = await refetch().unwrap();
    console.log("refreshed chats: ", payload);

    if (payload && payload?.code == 200) {
      const chats = filterDeletedChats(user?.id, payload.chats);
      setChatData(chats);
    }
  };

  // setInterval(refetchChat, 60000);
  // console.log("chats success: ", isSuccess);
  // console.log("chats error: ", error);
  // console.log("chats data: ", data);

  const onSwitch = () => {
    setisActive(isActive == 1 ? 0 : 1);
  };
  const [search, setSearch] = useState("");

  const onSearchChange = (param: string) => {
    setSearch(param);
  };

  if (isError || [isSuccess, data?.code !== 200].every(Boolean)) {
    if (data.message.includes(EMPTY_CHAT_RES))
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        >
          <Box flex={1} mt={"m"} pt={"m"}>
            <MainHeader title="Messages" />
            <Box mb={"ml"}>
              <Searchbar
                loader={false}
                value={search}
                onChange={onSearchChange}
                placeholder="Recherche"
              />
            </Box>
            <SwitchControl activeIndex={isActive} onSwitch={onSwitch} />
            <SectionHeader title={"En Ligne"} more={true} />

            <Stories data={FollowingList} />
            <SectionHeader title={"Tous Les Messages"} more={false} />
            <EmptyChat />
          </Box>
        </ScrollView>
      );
    return <ErrorDisplayView message={isError ? error?.error : data.message} />;
  }

  if ([isSuccess, data?.code === 200, data?.length === 0].every(Boolean)) {
    return (
      <ErrorDisplayView
        message={
          "Vous n'avez aucun message en ce moment, Veuillez démarrer une conversation"
        }
      />
    );
  }

  if (isLoading || isUninitialized) {
    return (
      <Box flex={1} width={width} height={height}>
        <MsgSkeleton />
      </Box>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
    >
      <Box flex={1} mt={"m"} pt={"m"}>
        <MainHeader title="Messages" />
        <Box mb={"ml"}>
          <Searchbar
            loader={false}
            value={search}
            onChange={onSearchChange}
            placeholder="Recherche"
          />
        </Box>
        {/* <SwitchControl activeIndex={isActive} onSwitch={onSwitch} />
        <SectionHeader title={"En Ligne"} more={true} />

        <Stories data={FollowingList} />
        <SectionHeader title={"Tous Les Messages"} more={false} /> */}

        {isActive === 0 ? (
          <MessageListing
            refetchChats={refetchChat}
            states={{
              isLoading,
              isError,
              isFetching,
              isSuccess,
              isUninitialized,
              error,
            }}
            data={chatData}
          />
        ) : null}
      </Box>
    </ScrollView>
  );
};

export default Messages;
