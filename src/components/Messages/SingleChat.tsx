import {
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import _ from "lodash";

import Box from "../shared/Box";
import Text from "../shared/Text";
import Loader from "../shared/Loader";
import Avatar from "../shared/Avatar";
import useChatController from "../../viewController/Messages/ChatController";
import ErrorDisplayView from "../shared/ErrorDisplayView";

import { AntDesign } from "@expo/vector-icons";
import { SingleChatProps } from "../../types/global";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../Context";
import { computeTimeDiff } from "../../utils";
import { useGetChatByIdMutation } from "../../Api/ChatsApi";

const leftButtons = [];
const rightButtons = ["btn1"];
const btnWidth = 80;
const offset = [-btnWidth * rightButtons.length, btnWidth * leftButtons.length];

const SingleChat: React.FC<SingleChatProps> = ({ chatId, triggerRefetch }) => {
  const [initialRender, setInitialRender] = useState(true);
  const [sender, setSender] = useState(null);
  const navigation = useNavigation();
  const { user } = useUserContext();
  const { getSingleChatById, onDeleteChat, chatbyIdresponse } =
    useChatController();

  const { isError, isLoading, error, isSuccess, isUninitialized, data } =
    chatbyIdresponse;

  useEffect(() => {
    getSingleChatById(chatId);

    return () => {
      setInitialRender(true);
    };
  }, []);

  useEffect(() => {
    if (data && data?.code === 200) {
      setSender(
        data.chat["user_two"].id !== user.id
          ? data.chat["user_two"]
          : data.chat["user_one"]
      );
    }

    return () => {
      setSender(null);
    };
  }, [isLoading, data]);

  useEffect(() => {
    pan.addListener((value) => {
      panValue = value;
    });
  }, []);

  let panValue = { x: 0, y: 0 };
  let isOpenState = useRef(false).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const itemTranslate = pan.x.interpolate({
    inputRange: offset,
    outputRange: offset,
    extrapolate: "clamp",
  });

  const translateLeftBtns = pan.x.interpolate({
    inputRange: [-leftButtons.length * btnWidth, 0],
    outputRange: [-leftButtons.length * btnWidth, 0],
    extrapolate: "clamp",
  });

  const translateRightBtns = pan.x.interpolate({
    inputRange: [0, rightButtons.length * btnWidth],
    outputRange: [0, rightButtons.length * btnWidth],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponderCapture: (e, g) => Math.abs(g.dx) > 10,
      onMoveShouldSetPanResponder: (e, g) => false,
      onPanResponderGrant: () => {
        pan.setOffset({ x: panValue.x, y: panValue.y });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        pan.flattenOffset();
        if (g.vx > 0.5 || g.dx > (btnWidth * leftButtons.length) / 2) {
          if (isOpenState && g.dx > 0) {
            reset();
            return;
          }
          move(false);
          return;
        }
        if (g.vx < -0.5 || g.dx < (-btnWidth * rightButtons.length) / 2) {
          if (isOpenState && g.dx < 0) {
            reset();
            return;
          }
          move(true);
          return;
        }
        reset();
      },
      onPanResponderTerminate: () => {
        reset();
      },
    })
  ).current;

  const reset = () => {
    isOpenState = false;
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const move = (toLeft) => {
    isOpenState = true;
    Animated.spring(pan, {
      toValue: {
        x: toLeft
          ? -btnWidth * rightButtons.length
          : btnWidth * leftButtons.length,
        y: 0,
      },
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };

  const handlePress = () => {
    navigation.navigate("Accueil", { screen: "Chats", params: { chatId } });
  };

  const handleDelete = async () => {
    await onDeleteChat({ userId: user.id, chatId });
    triggerRefetch();
    reset();
  };

  if (isLoading || isUninitialized) {
    return (
      <Box m={"xl"}>
        <Loader
          sizeSpinner={20}
          message="En cours de chargement, Veuillez Patienter"
        />
      </Box>
    );
  }

  if (isError || [isSuccess, data?.code !== 200].every(Boolean)) {
    return (
      <ErrorDisplayView message={isError ? error?.error : data?.message} />
    );
  }

  if ([isSuccess, data?.code === 200, data?.chat == undefined].every(Boolean)) {
    return (
      <ErrorDisplayView
        message={
          "Vous n'avez aucun message en ce moment, Veuillez démarrer une conversation"
        }
      />
    );
  }
  // console.log(
  //   "messages: ",
  //   data.chat.messages.data[data.chat.messages.data.length - 1]
  // );

  return (
    <Box height={75} width={"100%"} backgroundColor={"white"}>
      <Animated.View
        style={[
          styles.btnContainer,
          { transform: [{ translateX: translateLeftBtns }] },
        ]}
      >
        {/* future update more functionalities on swipe rigth */}
        {leftButtons?.map((btn) => (
          <TouchableOpacity
            onPress={reset}
            key={btn}
            style={[styles.btn, { backgroundColor: "red" }]}
          >
            <Text>{btn}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <Animated.View
        style={[
          styles.btnContainer,
          {
            transform: [{ translateX: translateRightBtns }],
            alignSelf: "flex-end",
          },
        ]}
      >
        {/* left swipe buttons  */}
        {/* {rightButtons.map((btn) => (
          <TouchableOpacity
            onPress={reset}
            key={btn}
            style={[styles.btn, { backgroundColor: "orange" }]}
          >
            <Text>{btn}</Text>
          </TouchableOpacity>
        ))} */}
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.btn, { backgroundColor: "red" }]}
        >
          <AntDesign name="delete" size={24} color="white" />
          <Text style={{ color: "white" }}>Supprimer</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[styles.item, { transform: [{ translateX: itemTranslate }] }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          onPress={handlePress}
          style={{ flexDirection: "row", flex: 1 }}
        >
          <Box flex={2} justifyContent={"center"} alignItems={"center"}>
            <Avatar type="menu" source={{ uri: sender?.avatar }} />
          </Box>
          <Box flex={6} ml={"l"} py={"m"} justifyContent={"space-around"}>
            <Text variant={"title1"}>
              {sender?.fname} {sender?.lname}
            </Text>
            <Text variant={"caption"}>
              {data?.chat?.messages?.data !== undefined &&
                data?.chat?.messages?.data.length > 0 &&
                data?.chat?.messages?.data[
                  data?.chat?.messages?.data.length - 1
                ]["message"]}
            </Text>
          </Box>
          <Box
            flex={2}
            py={"m"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            {Boolean(
              Number(
                data?.chat?.messages?.data !== undefined &&
                  data?.chat?.messages?.data.length > 0 &&
                  data.chat.messages.data[data.chat.messages.data.length - 1][
                    "seen"
                  ]
              )
            ) && <Pill />}
            <Text variant={"caption"}>
              {data?.chat?.messages?.data !== undefined &&
                data?.chat?.messages?.data.length > 0 &&
                computeTimeDiff(
                  data?.chat?.messages?.data[
                    data?.chat?.messages?.data.length - 1
                  ].time
                )}
            </Text>
          </Box>
        </TouchableOpacity>
      </Animated.View>
    </Box>
  );
};

export default SingleChat;

const Pill = () => {
  return (
    <Box
      backgroundColor={"borderColor1"}
      borderRadius={10}
      width={10}
      height={10}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    marginBottom: 3,
  },
  item: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    elevation: 4,
  },
  txt: {
    color: "#fff",
    letterSpacing: 1,
  },
  btnContainer: {
    height: "100%",
    position: "absolute",
    flexDirection: "row",
  },
  btn: {
    height: "100%",
    width: btnWidth - 10,
    backgroundColor: "red",
    marginRight: 4,
    borderRadius: 8,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
