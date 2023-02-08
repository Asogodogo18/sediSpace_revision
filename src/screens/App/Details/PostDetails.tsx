import React, { useEffect, useState } from "react";
import { Platform, ScrollView } from "react-native";
import {
  Box,
  Post,
  ReplyField,
  Line,
  Text,
  ErrorDisplayView,
} from "../../../components";
import { useUserContext } from "../../../Context";
import { BallIndicator } from "react-native-indicators";

import usePostController from "../../../viewController/Post/usePostController";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostDetails({ route }) {
  const { user } = useUserContext();

  const { postId } = route.params;
  const {
    getPostById,
    comment,
    handleCommentChange,
    newComment,
    isSuccess: isCommentSuccess,
    isError: isCommentError,
    isLoading: sendingCOmment,
    data: commentData,
  } = usePostController();
  const {
    data: postData,
    isLoading,
    isFetching,
    isError,
    error,
  } = getPostById(postId);
  const [image, setImage] = useState([]);

  // //console.log("post params: ", route.params);

  console.log("single Post: ", postData);
  const handleSubmitComment = async () => {
    const commentPayload = new FormData();
    commentPayload.append("user", user.id);
    commentPayload.append("thread", postData.data.id);
    commentPayload.append("text", comment);

    if (image.length == 0) commentPayload.append("type", "1");
    else if (image.length > 0) {
      const upload =
        Platform.OS === "android"
          ? image[0].uri
          : image[0].uri.replace("file://", "");
      commentPayload.append("type", "2");
      commentPayload.append("image", upload);
    }
    await newComment(commentPayload);
    if (isCommentSuccess) handleCommentChange("");
  };
  //console.log("comment response : ", commentData);

  // //console.log("post deails request: ", postData);

  if (isLoading || isFetching) {
    return (
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <BallIndicator color="green" size={30} animating interaction />
      </Box>
    );
  }
  if (isError) {
    return <ErrorDisplayView message={error?.error} />;
  }
  return (
    <ScrollView
      contentContainerStyle={{ padding: 2, flexGrow: 1, paddingBottom: 60 }}
      keyboardShouldPersistTaps="handled"
    >
      {postData.status !== 200 ? (
        <ErrorDisplayView message={postData.message} />
      ) : (
        <>
          <Post data={postData.data} type={"details"} onPress={() => {}} />
          <Line
            width={"100%"}
            height={2}
            alignSelf={"center"}
            backgroundColor={"lightgreen"}
          />
        </>
      )}

      {postData?.data?.replys_count.length > 0
        ? postData?.data?.replys_count.map((postReply, index) => (
            <Post
              key={`post-reply-0${index}`}
              data={postReply}
              type={"reply"}
              onPress={() => {}}
            />
          ))
        : null}
      <Box position={"absolute"} bottom={0} alignSelf={"center"} width={"100%"}>
        <ReplyField
          value={comment}
          onChange={handleCommentChange}
          onSubmit={handleSubmitComment}
          placeholder="Votre Commentaire"
        />
      </Box>
    </ScrollView>
  );
}
