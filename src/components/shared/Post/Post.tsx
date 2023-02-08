import React, { ReactNode, useEffect, useRef, useState } from "react";
import { BoxProps } from "@shopify/restyle";
import { decode } from "html-entities";
import {
  Ionicons,
  EvilIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { computeTimeDiff, formatDate, joinReplys } from "../../../utils";
import theme, { Theme } from "../../../theme.android";
import Box from "../Box";
import Text from "../Text";
import Avatar from "../Avatar";
import {
  Animated,
  Button,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  View,
  PanResponder,
  Modal,
  StyleSheet,
} from "react-native";
import { hasLiked } from "../../../utils/postsUtils";
import { BallIndicator } from "react-native-indicators";
import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Media from "../Media";

import { MediaType } from "../../../types/global";
import useUserController from "../../../viewController/Users/UserController";
import usePostController from "../../../viewController/Post/usePostController";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../Context";
import IconContainer from "../IconContainer";
import { toastError } from "../../../utils/toastHandler";
import { sharePosts } from "../../../utils/shareUtils";

const { width, height } = Dimensions.get("screen");

enum PostTypes {
  main,
  details,
  reply,
}

type PostProps = {
  data: any;
  type: keyof typeof PostTypes;
  onPress?: (id: string | number) => void;
} & Partial<BoxProps<Theme>>;

type PostHeaderProps = {
  avatarSrc: string;
  name: string;
  username: string;
  timestamp: string;
  isOwner: boolean;
  onAvatarPress: () => void;
  type: keyof typeof PostTypes;
  onPostDelete: () => void;
  onPostSave: () => void;
};

type PostFooterProps = {
  replys_count: string;
  likes_count: string;
  repost_count: string;
  shareCount?: string;
  id: number;
  isLiked: boolean;
  isRetweeted: boolean;
  onLikePost: () => void;
  onRepost: () => void;
  onShare: () => void;
};

type PostContentProps = {
  media: MediaType[];
  body?: string;
  timestamp: string;
  replyTo?: [];
  type: keyof typeof PostTypes;
  toggleModal: Function;
  setCurrentMedia: React.Dispatch<React.SetStateAction<null>>;
};

const PostHeader: React.FC<PostHeaderProps> = ({
  name,
  avatarSrc,
  username,
  timestamp,
  type,
  onAvatarPress,
  isOwner,
  onPostDelete,
  onPostSave,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const onMenuPress = () => {
    setOpenMenu(!openMenu);
  };

  const onBackdropPress = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <Box
        py={"m"}
        px={"l"}
        alignItems={"center"}
        flexDirection={"row"}
        height={60}
      >
        <Avatar
          onPress={onAvatarPress}
          type="header"
          source={{ uri: avatarSrc }}
        />
        <Box marginLeft={"l"} alignItems={"flex-start"}>
          <Box
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Text variant={"title"}>{name}</Text>
            <Text ml={"s"} variant={"subtitle"}>
              @{username}
            </Text>
          </Box>

          {type !== "details" && (
            <Box flexDirection={"row"} alignItems={"center"}>
              <Box
                width={4}
                height={4}
                borderRadius={4}
                backgroundColor={"grayDark"}
              />
              <Text marginLeft={"s"} variant={"caption"}>
                {computeTimeDiff(timestamp)}
              </Text>
            </Box>
          )}
        </Box>
        <TouchableOpacity
          onPress={onMenuPress}
          style={{
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 10,
          }}
        >
          <SimpleLineIcons name="options-vertical" size={18} color="gray" />
        </TouchableOpacity>
        <Menu
          opened={openMenu}
          // renderer={renderers.Popover}
          // rendererProps={{ preferredPlacement: "right" }}
          onBackdropPress={onBackdropPress}
        >
          <MenuTrigger />

          <MenuOptions optionsContainerStyle={{}}>
            <MenuOption onSelect={onPostSave}>
              <IconContainer>
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={20}
                  color="black"
                />
                <Text ml={"s"}>Enregistrer</Text>
                {/*
                component when post is bookmarked
                <MaterialCommunityIcons name="bookmark-check" size={24} color="black" /> */}
              </IconContainer>
            </MenuOption>
            {isOwner ? (
              <MenuOption onSelect={onPostDelete}>
                <IconContainer>
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color="black"
                  />
                  <Text ml={"s"}>Supprimer</Text>
                </IconContainer>
              </MenuOption>
            ) : null}
            <MenuOption onSelect={() => {}}>
              <IconContainer>
                <MaterialCommunityIcons name="alert" size={20} color="red" />
                <Text ml={"s"} color={"danger"}>
                  Signaler un Abus
                </Text>
              </IconContainer>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </Box>
    </>
  );
};

const PostFooter: React.FC<PostFooterProps> = ({
  replys_count,
  likes_count,
  repost_count,
  shareCount = 0,
  onLikePost,
  onRepost,
  isLiked,
  isRetweeted,
  id,
  onShare,
}) => {
  const navigation = useNavigation();
  const handleNavigation = (id) => {
    navigation.navigate("Accueil", {
      screen: "Publication",
      params: { postId: id },
    });
  };

  return (
    <Box
      alignItems={"center"}
      justifyContent={"space-around"}
      flexDirection={"row"}
      height={25}
    >
      <TouchableOpacity onPress={() => handleNavigation(id)}>
        <Box flexDirection={"row"} alignItems={"center"}>
          <EvilIcons name="comment" size={24} color={theme.colors.grayDark} />
          <Text fontSize={11} variant={"caption"}>
            {replys_count}
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={onLikePost}>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? "rgba(255,84,84,1)" : theme.colors.grayDark}
          />
          <Text fontSize={11} variant={"caption"}>
            {likes_count}
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRepost}>
        <Box flexDirection={"row"} alignItems={"center"}>
          <EvilIcons
            name="retweet"
            size={24}
            color={isRetweeted ? "green" : theme.colors.grayDark}
          />
          <Text fontSize={11} variant={"caption"}>
            {repost_count}
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity onPress={onShare}>
        <Box flexDirection={"row"} alignItems={"center"}>
          <Ionicons
            name="share-outline"
            size={18}
            color={theme.colors.grayDark}
          />
          <Text fontSize={11} variant={"caption"}>
            {shareCount}
          </Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

const PostContent: React.FC<PostContentProps> = ({
  type,
  media,
  body,
  replyTo,
  timestamp,
  toggleModal,
  setCurrentMedia,
}) => {
  const navigation = useNavigation();
  return (
    <Box flex={1} width={"100%"} px={"l"}>
      {type === "reply" && (
        <Box alignItems={"center"} flexWrap={"wrap"} flexDirection="row">
          <Text fontSize={12} variant={"caption"}>
            En réponse à{" "}
          </Text>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() =>
              navigation.navigate("Profile", {
                userID: replyTo?.id,
                self: false,
              })
            }
          >
            <Text variant={"body1"}>{replyTo?.username}</Text>
          </TouchableOpacity>
        </Box>
      )}

      {media.length === 0 ? null : media.length <= 1 ? (
        <Media
          setCurrentMedia={setCurrentMedia}
          toggleModal={toggleModal}
          single={true}
          media={media[0]}
        />
      ) : (
        <Box flex={1} flexDirection={"row"} flexWrap={"wrap"}>
          {media?.map((item, index) => (
            <Media
              setCurrentMedia={setCurrentMedia}
              toggleModal={toggleModal}
              key={`media_no-${index}`}
              media={item}
            />
          ))}
        </Box>
      )}

      <Text mt={"s"} variant="body1">
        {decode(body)}
      </Text>
      {type === "details" && (
        <Text my={"xs"} variant={"caption"}>
          {formatDate(timestamp)}
        </Text>
      )}
    </Box>
  );
};

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Post: React.FC<PostProps> = ({ data, type, onPress, ...props }) => {
  const { id } = data;
  const { getUserById } = useUserController();
  const [layoutData, setData] = useState(null);
  const { user } = useUserContext();
  const { deletePostMutation, likePost, savePost, rePost } =
    usePostController();

  const {
    data: userData,
    isLoading,
    isFetching,
    isError,
    error,
  } = getUserById(data.user_id);

  const [currentMedia, setCurrentMedia] = useState(null);

  // //console.log("post delete : ", postDeleteData);
  // //console.log("post delete error : ", isDeletePostError);

  const navigation = useNavigation();

  // console.log("booking : ", bookingData);

  // //console.log('Post data : ',data);

  // //console.log("error : ", userData);

  // //console.log('post user : ',data.user_id);

  const handleNavigation = (id) => {
    navigation.navigate("Accueil", {
      screen: "Publication",
      params: { postId: id },
    });
  };

  const onDeletePost = async () => {
    await deletePostMutation({ userID: user.id, postID: data.id });
  };
  const onSavePost = async () => {
    await savePost({ userID: user.id, postID: data.id });
  };

  const onLikePost = () => {
    likePost({ userID: user.id, postID: data.id });
  };
  const onRepost = () => {
    rePost({ userID: user.id, postID: data.id });
  };

  const handleShare = async () => {
    try {
      await sharePosts({ url: data?.url });
    } catch (e) {
      toastError(e.toString());
    }
  };

  const onAvatarPress = () => {
    navigation.navigate("Profile", { userID: data.user_id, self: false });
  };

  if (isLoading || isFetching) {
    return (
      <Box flex={1} justifyContent={"center"} alignItems={"center"} m={"ml"}>
        <BallIndicator color="green" size={25} animating interaction />
      </Box>
    );
  }
  if (isError || userData.code !== 200) {
    return (
      <Box
        my={"s"}
        px={"s"}
        backgroundColor="white"
        alignItems={"center"}
        flexDirection={"row"}
        minWidth={300}
        {...props}
      >
        <Text color={"danger"} variant={"body2"}>
          {error?.error?.toString() || userData.message}
        </Text>
      </Box>
    );
  }
  return (
    <Box
      my={"s"}
      px={"s"}
      backgroundColor="white"
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      minHeight={100}
      {...props}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: "100%" }}
        onPress={() => handleNavigation(id)}
      >
        <PostHeader
          isOwner={data.user_id === user.id}
          type={type}
          onAvatarPress={onAvatarPress}
          avatarSrc={data?.reply_to?.avatar}
          name={`${userData?.data?.first_name} ${userData?.data?.last_name}`}
          username={userData?.data?.user_name}
          timestamp={data.time}
          onPostDelete={onDeletePost}
          onPostSave={onSavePost}
        />
        {data.type === "text" ? (
          <PostContent
            type={type}
            media={[]}
            replyTo={type == "reply" ? data.reply_to : null}
            body={data.text}
            timestamp={data.time}
            toggleModal={(data: any) => setData(data)}
            setCurrentMedia={setCurrentMedia}
          />
        ) : (
          <PostContent
            type={type}
            media={data.image}
            replyTo={type == "reply" ? data.reply_to : null}
            body={data.text}
            timestamp={data.time}
            toggleModal={(data: any) => setData(data)}
            setCurrentMedia={setCurrentMedia}
          />
        )}
        <PostFooter
          onShare={handleShare}
          onLikePost={onLikePost}
          onRepost={onRepost}
          isRetweeted={hasLiked(data.reposts_count, user.id)}
          isLiked={hasLiked(data.likes_count, user.id)}
          likes_count={data.likes_count ? data.likes_count.length : "0"}
          repost_count={data.reposts_count}
          replys_count={data.replys_count ? data.replys_count.length : "0"}
          id={id}
        />
      </TouchableOpacity>

      {layoutData !== null && (
        <ModalView
          layoutData={layoutData}
          currentMedia={currentMedia}
          close={() => {
            setData(null);
            setCurrentMedia(null);
          }}
        />
      )}
    </Box>
  );
};

function ModalView({ layoutData, close, currentMedia }) {
  const { x, y, _width, _height } = layoutData;
  const animtion = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [expanded, setExpanded] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setExpanded(true);
    }, 10);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 2000);
  }, []);
  const onRequestClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        150,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity
      ),
      () => {
        close();
      }
    );
    setExpanded(false);
  };
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, { dy: animtion.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, g) => {
        if (Math.abs(g.vy) > 2) {
          reset(true, g.vy > 0);
          return;
        }
        reset();
      },
      onPanResponderTerminate: () => {
        reset();
      },
    })
  ).current;
  const reset = (closeModal, down) => {
    Animated.spring(animtion, {
      toValue: { x: 0, y: closeModal ? height * (down ? 1 : -1) : 0 },
      bounciness: 0,
      useNativeDriver: true,
    }).start();
    if (closeModal) {
      setTimeout(() => {
        close();
      }, 200);
    }
  };
  return (
    <Modal visible onRequestClose={onRequestClose} transparent>
      <View style={[styles.center]} {...panResponder.panHandlers}>
        {expanded && (
          <Animated.View
            style={[StyleSheet.absoluteFill, { backgroundColor: "#000000aa" }]}
          />
        )}
        <Animated.View
          style={[
            expanded
              ? {
                  height: "100%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }
              : {
                  height: _height,
                  width: _width,
                  left: x,
                  top: y,
                  position: "absolute",
                },
            {
              backgroundColor: "#000",
              overflow: "hidden",
              transform: animtion.getTranslateTransform(),
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Media single={true} media={currentMedia} expanded={true} />
          {expanded && (
            <View style={styles.close}>
              <Button title="Fermer" onPress={onRequestClose} />
            </View>
          )}
          {isPopupVisible && (
            <Text
              style={[
                styles.label,
                {
                  textAlign: "center",
                  position: "absolute",
                  bottom: height / 6,
                },
              ]}
            >
              Glisser vers le haut ou le bas pour fermer
            </Text>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

export default Post;

const styles = StyleSheet.create({
  item: {
    height: width / 2,
    flex: 1,
    padding: 3,
  },
  close: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  label: {
    color: "#fff",
    fontSize: 20,
    marginTop: 100,
  },
});
