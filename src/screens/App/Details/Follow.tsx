import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Box,
  FollowersListing,
  MainHeader,
  Text,
  FollowingsListing,
} from "../../../components";
import { toastError } from "../../../utils/toastHandler";
import useUserController from "../../../viewController/Users/UserController";

type Props = {};

type TabBarProps = {
  onSwitch: (i: number) => void;
  activeTab: number;
};

const { width } = Dimensions.get("window");
const isIphone = Platform.OS == "ios";

const Follow = ({ route }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getUserFromId, userRefetchTrigger } = useUserController();

  useEffect(() => {
    console.log("follow params: ", route.params);
    setIsLoading(true);
    if (route.params.active !== undefined) {
      setActiveTab(route.params.active);
      loadUserData(route.params.user).then(() => {
        setIsLoading(false);
      });
    }

    return () => {
      setFollowersList([]);
      setFollowingList([]);
    };
  }, [userRefetchTrigger, route.params]);

  const loadUserData = async (id: string) => {
    setIsLoading(true);
    try {
      const payload = await getUserFromId(id);
      console.log("use follow screen response", payload);

      if (payload.code === 200) {
        setFollowersList(payload.data.followers.data);
        setFollowingList(payload.data.following.data);
        setIsLoading(false);
      } else if (payload.code !== 200) {
        setIsLoading(false);
        throw new Error(payload?.message);
      }
    } catch (error) {
      console.log("error user data: ", error);
      toastError(error.toString());
      setIsLoading(false);
    }
  };

  const switchHandler = (index: number) => {
    if (activeTab !== index) setActiveTab(index);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
      <Box width={width} flexDirection={"row"} alignItems={"center"}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            elevation: 4,
            paddingRight: 8,
          }}
        >
          <AntDesign name="left" size={48} color="black" />
        </TouchableOpacity>
        <MainHeader title={activeTab == 0 ? "Abonnés" : "Abonnements"} />
      </Box>
      <TabBar onSwitch={switchHandler} activeTab={activeTab} />
      {activeTab == 0 ? (
        <FollowersListing data={followersList} />
      ) : (
        <FollowingsListing data={followingList} />
      )}
    </SafeAreaView>
  );
};

export default Follow;

const TabBar: React.FC<TabBarProps> = ({ onSwitch, activeTab }) => {
  return (
    <Box
      width={"100%"}
      height={60}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box flex={1} height={80} flexDirection={"row"} alignItems={"center"}>
        <Box
          flex={1}
          style={activeTab == 0 ? activeTabStyle : inactiveTabStyle}
          height={"100%"}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              //   width: "100%",
              //   height: "100% ",
            }}
            onPress={() => onSwitch(0)}
          >
            <Text
              fontSize={14}
              variant={activeTab == 0 ? "tabTextActive" : "tabText"}
            >
              Abonnés
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          flex={1}
          style={activeTab == 1 ? activeTabStyle : inactiveTabStyle}
          height={"100%"}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              //   width: "100%",
              //   height: "100% ",
            }}
            onPress={() => onSwitch(1)}
          >
            <Text
              fontSize={14}
              variant={activeTab == 1 ? "tabTextActive" : "tabText"}
            >
              Abonnements
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

const activeTabStyle = {
  backgroundColor: "#FFF",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  elevation: 5,
};
const inactiveTabStyle = {};
