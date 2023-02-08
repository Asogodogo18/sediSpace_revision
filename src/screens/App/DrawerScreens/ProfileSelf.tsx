import {
  Box,
  Text,
  Post,
  Searchbar,
  SearchFilters,
  ProfileHeader,
  TabNav,
} from "../../../components";

import { ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { PostImage, PostMultipleImages } from "../../../data/post";
import useUserController from "../../../viewController/Users/UserController";
import usePostController from "../../../viewController/Post/usePostController";
import { UserApi } from "../../../Api";
import { BallIndicator } from "react-native-indicators";


const Profile = ({ navigation, route }) => {
  //console.log("profile params :", route.params);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    getPostData,
    isLoading: postLoading,
    error: postError,
  } = usePostController();

  // //console.log("profile user ", user);

  const handleNavigation = () => {
    return navigation.navigate("HomeStack", { screen: "PostDetails" });
  };

  useEffect(() => {
    setIsLoading(true);
    UserApi.getOne(route.params.userID)
      .then((result) => {
        //console.log("result user info : ", result.data);
        setUserProfile(result.data);
      })
      .catch((err) => {
        //console.log("error user: ", err);
        setError(error);
      })
      .finally(() => setIsLoading(false));

    return () => {
      setUserProfile(null);
    };
  }, [route.params.userID]);

  if (isLoading) {
    return (
      <Box flex={1} backgroundColor={"white"}>
        <BallIndicator color="green" size={50} animating interaction />
      </Box>
    );
  }
  if (error) {
    return (
      <Box my={"s"} px={"s"} backgroundColor="white" alignItems={"center"}>
        <Text color={"danger"} variant={"body2"}>
          {error}
        </Text>
      </Box>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignContent: "center",
        backgroundColor: "#F3F3F3",
      }}
      showsHorizontalScrollIndicator={false}
    >
      <Box mt={"xl"}>
        <ProfileHeader user={userProfile} />
      </Box>
      <Box my={"m"}>
        <TabNav />
      </Box>
      <Box flex={1} px={"m"}>
        {/* <Post type="main" data={PostImage} onPress={handleNavigation} />
        <Post
          data={PostMultipleImages}
          onPress={handleNavigation}
          type={"main"}
        />
        <Post data={PostImage} onPress={handleNavigation} type={"main"} /> */}
      </Box>
    </ScrollView>
  );
};

export default Profile;
