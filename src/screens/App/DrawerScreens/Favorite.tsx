import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import Layout from "../../Layout";
import {
  Box,
  CoverScroll,
  ErrorDisplayView,
  MainHeader,
  ProfileContent,
} from "../../../components";
import { useUserContext } from "../../../Context";
import useLikedPosts from "../../../hooks/useLikedPosts";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorite = () => {
  const { user } = useUserContext();
  const {
    getLikedPosts,
    likedPostdata,
    loadMore,
    hasNextPage,
    isLoading: isLoadingLikedPosts,
    error,
  } = useLikedPosts();

  useEffect(() => {
    getLikedPosts(user?.id);
    return () => {};
  }, []);

  const onRefresh = () => {
    getLikedPosts(user?.id);
  };

  // if (isLoadingLikedPosts) {
  //   return (
  //     <Box
  //       flex={1}
  //       justifyContent={"center"}
  //       alignItems={"center"}
  //       backgroundColor={"white"}
  //     >
  //       <ActivityIndicator size={"large"} color="green" />
  //     </Box>
  //   );
  // }
  if (error) {
    return <ErrorDisplayView message={error} />;
  }

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <MainHeader title="Mes Favoris" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingLikedPosts}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            flexGrow: 1,
            alignContent: "center",
            backgroundColor: "#F3F3F3",
            paddingBottom: 10,
          }}
          showsHorizontalScrollIndicator={false}
          nestedScrollEnabled
        >
          <ProfileContent
            data={likedPostdata}
            hasNextPage={hasNextPage}
            isLoading={isLoadingLikedPosts}
            loadMore={loadMore}
          />
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Favorite;
