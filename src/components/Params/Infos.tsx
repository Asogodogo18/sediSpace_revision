import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";

import { useUserContext } from "../../Context";
import Box from "../shared/Box";
import Text from "../shared/Text";
import { SectionInput, Line, TextInput, Button, Avatar } from "../";
import { ScrollView } from "react-native";
import { useAuthController } from "../../viewController";
import launchImagePicker from "../../utils/ImagePicker";
import useUserController from "../../viewController/Users/UserController";
import { SafeAreaView } from "react-native-safe-area-context";
import { toastError } from "../../utils/toastHandler";

const Infos = () => {
  const { user } = useUserContext();
  const { updateUserProfile } = useAuthController();
  const { updateUserAvatar, updateUserCover } = useUserController();
  const navigation = useNavigation();
  // console.log("user: ", user);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(user?.avatar || "");
  const [name, setName] = useState(user?.first_name || "");
  const [surName, setSurName] = useState(user?.last_name || "");
  const [username, setUsername] = useState(`@${user?.user_name}` || "");
  const [email, setEmail] = useState(user?.email || "");
  const [urlSite, setUrlSite] = useState(
    user?.website !== "" ? user?.website : "Ex: www.example.com"
  );
  const [bio, setBio] = useState(
    user?.about !== "" ? user?.about : "A propos de vous"
  );
  const [sexe, setSexe] = useState("");

  const userField = [
    {
      label: "Nom de famille",
      value: name,
      onChange: (text) => setName(text),
    },
    {
      label: "Prénom",
      value: surName,
      onChange: (text) => setSurName(text),
    },
    {
      label: "Nom d’Utilisateur",
      value: username,
      onChange: (text) => setUsername(text),
    },
  ];

  const adress = [
    {
      label: "Email",
      value: email,
      onChange: (text) => setEmail(text),
    },
  ];
  const webSite = [
    {
      label: "Adresse url ",
      value: urlSite,
      onChange: (text) => setUrlSite(text),
    },
  ];

  const biographie = [
    {
      label: "",
      value: bio,
      onChange: (text) => setBio(text),
    },
  ];

  const onSubmit = async () => {
    const payload = { name, bio, email, sexe, surName, urlSite, username };
    console.log("profile update submitted");
    try {
      const status = await updateUserProfile(payload);
      if (status === true) setDataUpdated(false);
    } catch (error) {
      toastError(error.toString());
    }
  };

  const handleAvatarUpdate = async () => {
    let imagePicked = await launchImagePicker();
    if (imagePicked) {
      setProfileImage(imagePicked[0]?.uri);
      updateUserAvatar(imagePicked[0]?.uri);
    }
  };

  const handleCoverUpdate = async () => {
    let imagePicked = await launchImagePicker();
    if (imagePicked) {
      updateUserCover(imagePicked[0]?.uri);
    }
  };

  useEffect(() => {
    EventRegister.addEventListener("user profile updated", () => {
      if (!dataUpdated) setDataUpdated(true);
    });
    return () => {
      EventRegister.removeEventListener("user profile updated");
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1}>
        <Box
          flexDirection={"row"}
          // backgroundColor={"white"}
          // elevation={5}

          width={"100%"}
          mt={"xl"}
          p={"ml"}
          // justifyContent={"center"}
          alignItems={"center"}
          style={{ marginTop: -9, backgroundColor: "white", elevation: 5 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-chevron-back" size={30} color="black" />
          </TouchableOpacity>
          <Text variant={"titleBold"} marginLeft={"xl"}>
            Informations Profil
          </Text>
        </Box>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginVertical: 15 }}
          onPress={handleAvatarUpdate}
        >
          <Avatar type="main" source={{ uri: profileImage }} />
          <Box
            width={30}
            height={30}
            borderRadius={30}
            elevation={8}
            backgroundColor={"white"}
            borderWidth={2}
            borderColor={"black"}
            position={"relative"}
            top={-20}
            alignSelf={"center"}
            left={50}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Feather name="edit-2" size={16} color="black" />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCoverUpdate}
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "green",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 40,
            height: 35,
            flexDirection: "row",
            marginBottom: 15,
          }}
        >
          <AntDesign name="picture" size={20} color="green" />
          <Text ml={"s"} variant={"title1"}>
            Changer la Photo de Couverture
          </Text>
        </TouchableOpacity>
        <SectionInput data={userField} title="Identité" />
        <Line
          width={"100%"}
          height={2}
          alignSelf={"center"}
          backgroundColor={"lightgreen"}
        />
        <SectionInput data={adress} title="Adresse Electronique" />
        <Line
          width={"100%"}
          height={2}
          alignSelf={"center"}
          backgroundColor={"lightgreen"}
        />
        <SectionInput data={webSite} title="Site Web" />
        <Line
          width={"100%"}
          height={2}
          alignSelf={"center"}
          backgroundColor={"lightgreen"}
        />
        <SectionInput data={biographie} title="Votre Biographie" />
        <Line
          width={"100%"}
          height={2}
          alignSelf={"center"}
          backgroundColor={"lightgreen"}
        />
        <TextInput
          m={"xl"}
          type="dropdown"
          value={sexe}
          dropdownValues={["Votre Sexe?", "Masculin", "Feminin"]}
          onChange={setSexe}
        />
        {dataUpdated && (
          <Button
            primary
            alignSelf={"center"}
            loading={false}
            title="Enregistrer"
            onPress={onSubmit}
          />
        )}
      </Box>
    </SafeAreaView>
  );
};

export default Infos;
