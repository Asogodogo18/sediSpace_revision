import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Text, TextInput } from "../../../components";
import BottomSheet from "@gorhom/bottom-sheet";
import SectionIcon, { Icons } from "../../../components/shared/SectionIcon";
import {
  ActivityIndicator,
  Image,
  Alert,
  TextInput as LegacyInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserContext } from "../../../Context";
import usePostController from "../../../viewController/Post/usePostController";
import launchImagePicker, { launcnCamera } from "../../../utils/ImagePicker";

const PosteScreens = ({ isActive }: any) => {
  const inputRef = useRef<LegacyInput>();
  const { user } = useUserContext();
  const {
    message,
    handleMessageChange,
    createPost,
    isLoading,
    isError,
    error,
    isSuccess,

    data,
  } = usePostController();
  //console.log("user :", user.id);

  // console.log("DATA : ", data);

  // console.log("success :", isSuccess);
  // console.log("error image upload : ", error);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [showPoste, setShowPoste] = useState("");
  const [image, setImage] = useState<string[]>([]);
  const [imageUploadfile, setImageUploadfile] = useState(null);
  console.log("image state: ", image);

  // variables
  const snapPoints = ["40%", "20%"];
  const navigation = useNavigation();

  const onRemove = (index) => {
    setImage([
      ...image.slice(0, index),
      ...image.slice(index + 1, image.length),
    ]);
  };

  const handleLibraryPick = async () => {
    try {
      let imagePicked = await launchImagePicker();
      console.log("image: ", imagePicked);

      if (imagePicked) {
        console.log("images : ", imagePicked);
        const arrUri = imagePicked.map((item) => item.uri);
        console.log("images uri : ", arrUri);

        setImage([...image, ...arrUri]);
      }
    } catch (error) {
      Alert.alert("Erreur", error);
    }
  };

  const handleCameraPick = async () => {
    try {
      let imagePicked = await launcnCamera();
      if (imagePicked) {
        setImage([...image, imagePicked]);
      }
    } catch (error) {
      Alert.alert("Erreur", error);
    }
  };

  const handleCreatePost = () => {
    const postPayload = new FormData();
    postPayload.append("user", user.id);
    postPayload.append("text", message);

    if (image.length == 0) postPayload.append("type", "1");
    else if (image.length <= 1) {
      let file = image[0];
      let filename = file.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      postPayload.append("image", { uri: file, name: filename, type });
      postPayload.append("type", "2");
    } else if (image.length > 0) {
      const arrToSend = image.map((img) => {
        let file = img;
        let filename = file.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        const formattedImg = { uri: file, name: filename, type };
        return formattedImg;
      });

      postPayload.append("image[]", arrToSend.toString());
      postPayload.append("type", "2");
    }
    createPost(postPayload);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Box flex={1} backgroundColor={"white"}>
        <Box
          height={50}
          width={"100%"}
          elevation={2}
          backgroundColor={"white"}
          alignItems={"center"}
          flexDirection={"row"}
        >
          <Box flex={1} pl={"l"}>
            <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
              <EvilIcons name="close" size={30} color="black" />
            </TouchableOpacity>
          </Box>
          <Box flex={3}>
            <Text variant={"titleBold"}>Nouvelle Publication</Text>
          </Box>
          <Box flex={1.5}>
            {message && (
              <TouchableOpacity onPress={handleCreatePost}>
                <Text variant={"titleBold"} color={"greenDark"}>
                  Publier
                </Text>
              </TouchableOpacity>
            )}
          </Box>
        </Box>
        <Box
          flexDirection={"row"}
          alignItems={"center"}
          // bg={"danger"}
          height={120}
        >
          <Box flex={2} justifyContent={"space-around"} alignItems={"center"}>
            <Avatar
              type={"floating"}
              source={{
                uri: `${user?.avatar}`,
              }}
              elevation={5}
            />
          </Box>
          <Box flex={4.5} justifyContent={"center"}>
            <Text fontSize={14} variant={"titleBold"}>
              {user.first_name} {user.last_name}
            </Text>
            <Text variant={"caption"}> @{user.user_name}</Text>

            <TextInput
              inputStyle={{ fontSize: 10, width: "100%" }}
              borderRadius={5}
              type="dropdown"
              value={showPoste}
              height={30}
              minWidth={"40%"}
              maxWidth={"50%"}
              py={"s"}
              px={"s"}
              dropdownValues={[
                "Public",
                "Toutes Les Personnes",
                "Mes Followers",
                "Personne",
              ]}
              onChange={setShowPoste}
              backgroundColor={"white"}
            />
          </Box>
        </Box>

        <Box minHeight={150} backgroundColor={"fadingWhite"}>
          {isLoading ? (
            <Box flex={1} justifyContent="center" alignItems={"center"}>
              <ActivityIndicator size={"large"} color={"green"} />
            </Box>
          ) : (
            <>
              <TextInput
                // inputRef={inputRef}
                onChange={handleMessageChange}
                value={message}
                width={"100%"}
                borderRadius={5}
                alignSelf={"center"}
                placeholder={"Quoi de neuf................"}
                backgroundColor={"white"}
              />
              <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal>
                {image.map((uri, index) => {
                  return (
                    <Box
                      style={{
                        width: 180,
                        height: 180,
                        marginTop: 10,
                        elevation: 0,
                        borderRadius: 10,
                        margin: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <TouchableOpacity
                        onPress={() => onRemove(index)}
                        style={{
                          position: "absolute",
                          top: 5,
                          elevation: 5,
                          right: 5,
                          bottom: 0,
                          zIndex: 100,
                          backgroundColor: "white",
                          height: 30,
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: 20,
                        }}
                      >
                        <Entypo
                          name="circle-with-cross"
                          size={27}
                          color="red"
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri }}
                        style={{ height: "100%", width: "100%" }}
                        resizeMode="cover"
                        key={index}
                      />
                    </Box>
                  );
                })}
              </ScrollView>
            </>
          )}
        </Box>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          keyboardBehavior={"interactive"}
          snapPoints={snapPoints}
          // onChange={handleSheetChanges}
        >
          <Box
            style={{
              padding: 10,
              flex: 1,
            }}
          >
            <SectionIcon
              color="black"
              iconName="camera"
              placeholder="Caméra"
              size={24}
              onPress={handleCameraPick}
            />
            <SectionIcon
              color="black"
              iconName="picture"
              placeholder="Bibilothéque Photo et Vidéo"
              size={24}
              onPress={handleLibraryPick}
            />
            <SectionIcon
              color="black"
              iconName="smileo"
              placeholder="Emoji"
              size={24}
              onPress={() => {}}
            />
            <SectionIcon
              color="black"
              iconName="gift"
              placeholder="Gif"
              size={24}
              onPress={() => {}}
            />
          </Box>
        </BottomSheet>
      </Box>
    </SafeAreaView>
  );
};

export default PosteScreens;
