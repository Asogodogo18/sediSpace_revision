import {
  Box,
  ProfileHeader,
  TabNav,
  ErrorDisplayView,
  ProfileContent,
} from "../../../components";

import { ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import useUserController from "../../../viewController/Users/UserController";
import usePostController from "../../../viewController/Post/usePostController";
import { useUserContext } from "../../../Context";
import { SafeAreaView } from "react-native-safe-area-context";
import filterPosts from "../../../utils/filterPosts";
import { isFollowing } from "../../../utils/postsUtils";
import useLikedPosts from "../../../hooks/useLikedPosts";

const Profile = ({ navigation, route }) => {
  //console.log("profile params :", route.params);
  const { user } = useUserContext();
  const { getUserFromId, userRefetchTrigger } = useUserController();
  const { getPostByUser } = usePostController();
  const {
    getLikedPosts,
    likedPostdata,
    loadMore,
    hasNextPage,
    isLoading: isLoadingLikedPosts,
  } = useLikedPosts();

  const [userProfile, setUserProfile] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postError, setPostError] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const [postsMedia, setPostsMedia] = useState([]);
  const [posts, setPosts] = useState([]);

  const switchHandler = (index) => {
    if (isActive !== index) setIsActive(index);
  };

  const loadUserData = async (id: string) => {
    setIsLoadingUser(true);
    try {
      const payload = await getUserFromId(id);
      console.log("use mutation response", payload);

      if (payload.code === 200) {
        setUserProfile(payload.data);
        setIsLoadingUser(false);
        // setIsLoading(false);
      } else if (payload.code !== 200) {
        setError(payload?.message);
        setIsLoadingUser(false);
      }
      // console.log("userData: ", payload);
    } catch (error) {
      console.log("error user data: ", error);
      setError(error);
      setIsLoading(false);
    }
    // setIsLoading(false)
  };
  const loadUserPostData = async (id: string) => {
    console.log("user ID: ", id);

    try {
      const payload = await getPostByUser(id);
      console.log("user Profile Data: ", payload);

      if (payload.status === 200) {
        console.log("profile posts: ", payload.data);

        setPostsMedia(filterPosts.getPostsWithMedia(payload.data.posts));
        setPosts(filterPosts.getPostsWithText(payload.data.posts));
        setIsLoading(false);
      } else if (payload.status !== 200) {
        setPostError(payload?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error user data: ", error);
      setPostError(error.toString());
      setIsLoading(false);
    }
    // setIsLoading(false)
  };

  const getProfileData = async (id) => {
    return await Promise.all([loadUserData(id), loadUserPostData(id)]);
  };

  useEffect(() => {
    // console.log("refetching: ", userRefetchTrigger);
    setIsLoading(false);
    setIsReady(false);
    // console.log("route params: ", route.params);
    if (route.params.self !== undefined && route.params.self == false) {
      const { userID } = route.params;
      // console.log("route params: ", route.params.userID);
      getLikedPosts(userID);
      getProfileData(userID).then(() => {
        setIsReady(true);
      });
    } else {
      // console.log("getting own profile");
      getLikedPosts(user.id);
      getProfileData(user.id).then(() => {
        setIsReady(true);
      });
      return;
    }

    return () => {
      setUserProfile(null);
      setIsLoading(false);
      setIsReady(false);
      setPostsMedia([]);
      setError(null);
      setPostError(null);
      setPosts([]);
    };
  }, [userRefetchTrigger, route.params]);

  if (!isReady) {
    return (
      <Box
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"white"}
      >
        <ActivityIndicator size={"large"} color="green" />
      </Box>
    );
  }
  if (error) {
    return <ErrorDisplayView message={error} />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          backgroundColor: "#F3F3F3",
          paddingBottom: 10,
        }}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
      >
        <Box mt={"xl"}>
          <ProfileHeader
            isOwner={userProfile?.id === user.id}
            user={userProfile}
            isFollowing={isFollowing(user.id, userProfile?.followers.data)}
          />
        </Box>
        <Box my={"m"}>
          <TabNav isActive={isActive} onSwitch={switchHandler} />
        </Box>
        <Box flex={1} px={"m"}>
          {postError ? (
            <ErrorDisplayView message={postError} />
          ) : (
            <>
              {isActive == 0 ? (
                <ProfileContent data={postsMedia} />
              ) : isActive === 1 ? (
                <ProfileContent data={posts} />
              ) : (
                <ProfileContent
                  data={likedPostdata}
                  hasNextPage={hasNextPage}
                  isLoading={isLoadingLikedPosts}
                  loadMore={loadMore}
                />
              )}
            </>
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
