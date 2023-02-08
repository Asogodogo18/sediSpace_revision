import {
  Button,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import {
  Banner,
  Box,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  StepsIndicator,
  Text,
} from "../../components";
import { LinearGradient } from "expo-linear-gradient";

import { useAuthController } from "../../viewController";
import { useAuth } from "../../Context";
import { AVATAR_URL, USER_KEY } from "../../constants/general-constants";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { useNavigation } from "@react-navigation/native";
import { storeDataObject } from "../../services/storage";

const { width, height } = Dimensions.get("screen");

const ProfileUpdate = () => {
  const {
    name,
    surname,
    username,
    onChangeName,
    onChangeSurname,
    onChangeUsername,
    onClickSignUp,
    updateUserBio,
    updateUserLocalization,
    updateUserPrivacy,
  } = useAuthController();
  const { updateUsername, updateName, updateSurname } = useAuth();
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [image, setImage] = useState(AVATAR_URL);
  const [genre, setGenre] = useState("Sexe");
  const [bio, setBio] = useState("");
  const [language, setLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [privacy1, setPrivacy1] = useState("");
  const [privacy2, setPrivacy2] = useState("");
  const [privacy3, setPrivacy3] = useState("");

  const onGenreChange = (text) => {
    setGenre(text);
  };

  const onBioChange = (text) => {
    setBio(text);
  };

  const onCountryChange = (text) => {
    setCountry(text);
  };
  const onLanguageChange = (text) => {
    setLanguage(text);
  };

  const onPrivacy1Change = (text) => {
    setPrivacy1(text);
  };
  const onPrivacy2Change = (text) => {
    setPrivacy2(text);
  };
  const onPrivacy3Change = (text) => {
    setPrivacy3(text);
  };
  const submitProfile = async () => {
    const payload = { privacy1, privacy2, privacy3 };
    try {
      const res = await updateUserPrivacy(payload);

      console.log("reponse: ", res);

      if (res.status === 200) {
        toastSuccess(res.message);
        navigation.goBack();
      } else toastError(res.message);
    } catch (error) {
      toastError(error);
    }
  };
  const handleNext = () => {
    if (active == 0) setActive(active + 1);
    else if (active === 1) {
      if (name === "" || surname === "" || username === "") {
        toastError("Les champs sont vides!!!");
        return;
      }
      updateName(name);
      updateSurname(surname);
      updateUsername(username);
      onClickSignUp()
        .then((json) => {
          console.log("signUp: ", json);
          if (json.code !== 200) {
            console.log("login error: ", json);
            toastError(`${json.message}: ${json.err_code}`);
            return;
          }
          toastSuccess("Votre compte a été créé avec succès");
          storeDataObject(USER_KEY, json.data);
          setActive(active + 1);
        })
        .catch((e) => {
          console.log("error sign up:", e);
          toastError(e);
        });
    } else if (active === 2) {
      updateUserBio(bio);
      setActive(active + 1);
    } else if (active === 3) {
      updateUserLocalization({ language, country });
      setActive(active + 1);
    } else if (active === 4) {
    }
  };

  const handlePrev = () => {
    setActive(active - 1);
  };

  const handleImagechange = (image) => {
    setImage(image);
  };

  const STEPS = [
    {
      subtitle: "Ajouter une image de profil",
      component: <Step1 image={image} onPress={handleImagechange} />,
    },
    {
      subtitle: "Information Personelle",
      component: (
        <Step2
          image={image}
          onNameChange={onChangeName}
          onSurnameChange={onChangeSurname}
          genre={genre}
          onGenreChange={onGenreChange}
          name={name}
          surname={surname}
          username={username}
          onChangeUsername={onChangeUsername}
          genres={["Sexe", "Masculin", "Feminin"]}
        />
      ),
    },
    {
      subtitle: "A propos de vous",
      component: <Step3 bio={bio} onBioChange={onBioChange} image={image} />,
    },
    {
      subtitle: "Localisation",
      component: (
        <Step4
          image={image}
          language={language}
          onLanguageChange={onLanguageChange}
          country={country}
          onCountryChange={onCountryChange}
        />
      ),
    },
    {
      subtitle: "Confidentialité",
      component: (
        <Step5
          image={image}
          privacy1={privacy1}
          privacy2={privacy2}
          privacy3={privacy3}
          onPrivacy1Change={onPrivacy1Change}
          onPrivacy2Change={onPrivacy2Change}
          onPrivacy3Change={onPrivacy3Change}
        />
      ),
    },
  ];
  return (
    <LinearGradient
      style={{ flex: 1, paddingTop: 0, justifyContent: "center" }}
      colors={["#AAFFA9", "#11FFBD"]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Banner
            py={"l"}
            mt={"xl"}
            subTitle={STEPS[active].subtitle}
            step={active + 1}
          />
          <Box position={"absolute"} top={0} bottom={0} left={0}>
            <StepsIndicator activeIndex={active} />
          </Box>
          <Box ml={"xxxl"} pl={"xl"} flex={1}>
            {STEPS[active].component}
          </Box>
          <Box width={"100%"} height={80} flexDirection={"row"}>
            {!(active <= 0) && (
              <TouchableOpacity
                onPress={handlePrev}
                style={{ position: "absolute", left: 10, alignSelf: "center" }}
              >
                <Box flexDirection={"row"} alignItems={"center"}>
                  <Ionicons name="md-chevron-back" size={50} color="white" />
                  <Text variant={"btnText2"}>Retour</Text>
                </Box>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={active < 4 ? handleNext : submitProfile}
              style={{ position: "absolute", right: 10, alignSelf: "center" }}
              disabled={active > STEPS.length - 1}
            >
              <Box flexDirection={"row"} alignItems={"center"}>
                <Text variant={"btnText2"}>Suivant</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={50}
                  color="white"
                />
              </Box>
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ProfileUpdate;
