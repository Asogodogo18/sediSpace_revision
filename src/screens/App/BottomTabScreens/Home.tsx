import {
  Box,
  FeedFilters,
  Stories,
  Post,
  FollowCard,
  SectionHeader,
  MainHeader,
  ErrorDisplayView,
  FeedSkeleton,
  EmptyFeed,
  Text,
} from "../../../components";

import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, FlatList } from "react-native";

import defaultFilters from "../../../data/feed";
import FollowingList from "../../../data/stories";
import { SafeAreaView } from "react-native-safe-area-context";
import useFeedController from "../../../viewController/Feed/FeedController";
import { useUserContext } from "../../../Context";
import { EMPTY_FEED_RES } from "../../../constants/general-constants";

const Home = ({ navigation }) => {
  const { user } = useUserContext();
  const { getFeedList } = useFeedController();
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = getFeedList(user?.id);
  const [postData, setPostData] = useState([]);
  // console.log("posts: ", postData);

  console.log('user home screen: ', user)
  console.log("user id homescreen: ", posts);

  useEffect(() => {
    if (posts?.code === 200) {
      const postsOnly = posts.data.filter((post) => post.thread_id === 0);
      setPostData(postsOnly);
    }

    return () => {
      setPostData([]);
    };
  }, [posts]);

  const onRefreshFeed = async () => {
    return await refetch();
  };

  const handleNavigation = (id: string | number) => {
    navigation.navigate("Accueil", {
      screen: "Publication",
      params: { postId: id },
    });
  };

  // const { isLoading, posts } = useFeedController();
  //console.log("posts feed screen: ", posts);
  console.log("isFecthing", isFetching);
  console.log("isLoading", isLoading);

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FeedSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      {posts?.code !== undefined && posts?.code !== 200 ? (
        <Box flex={1}>
          <MainHeader title="Accueil" />
          {/* <FeedFilters
            data={defaultFilters}
            onPress={() => console.log("Press")}
          />
          <SectionHeader title={"Now"} more={true} link={() => {}} />
          <Stories data={FollowingList} /> */}
          {posts.message.includes(EMPTY_FEED_RES) ? (
            <EmptyFeed message="Veuillez suivre des utilisateurs afin de recevoir votre feed" />
          ) : (
            <ErrorDisplayView message={posts.message} />
          )}
        </Box>
      ) : (
        <Box flex={1}>
          <MainHeader title="Accueil" />

          <FlatList
            // ListHeaderComponent={() => (
            //   <>
            //     <FeedFilters
            //       data={defaultFilters}
            //       onPress={() => console.log("Press")}
            //     />

            //     <SectionHeader title={"Now"} more={true} link={() => {}} />

            //     <Stories data={FollowingList} />
            //   </>
            // )}
            data={postData}
            initialNumToRender={10}
            contentContainerStyle={{ flexGrow: 1 }}
            style={{}}
            onRefresh={onRefreshFeed}
            refreshing={isLoading}
            onEndReachedThreshold={0.3}
            keyExtractor={(item, i) => `post-0${i}`}
            renderItem={({ item }) => (
              <Post data={item} type={"main"} onPress={handleNavigation} />
            )}
            ListFooterComponent={() => (
              <Box
                width={"100%"}
                height={100}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text variant={"title"}> Il n'a plus de postes en ce moment</Text>
              </Box>
            )}
            ListFooterComponentStyle={{ paddingBottom: 40 }}
          />
        </Box>
      )}
    </SafeAreaView>
  );
};

export default Home;
