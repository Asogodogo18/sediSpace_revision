import {
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Platform,
  Image,
  Switch,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Box, Text, TextInput, Button } from "../../components";
import { LinearGradient } from "expo-linear-gradient";

import { useAuthController } from "../../viewController";
import { useAuth } from "../../Context";
import { AVATAR_URL, USER_KEY } from "../../constants/general-constants";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { useNavigation } from "@react-navigation/native";
import { storeDataObject } from "../../services/storage";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

const ProfileUpdate = () => {
  const { onSignUp } = useAuthController();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirme, setPassConfirme] = useState("");
  const [username, setUsername] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const showPassword = () => setIsPasswordVisible(!isPasswordVisible);
  const [isEnabled, setIsEnabled] = useState(false);
  const togglePressable = () => setChecked(!isChecked);
  const [isChecked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Navigation = useNavigation();

  const enableSignUpBtn = [
    name,
    surname,
    email,
    password,
    passConfirme,
    username,
  ].every(Boolean);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const handleSignUp = async () => {
    if (name === "" || surname === "" || username === "") {
      toastError("Les champs sont vides!!!");
      return;
    }
    if (password !== passConfirme) {
      toastError("Les Mots de Passe ne sont pas identiques!!!");
      return;
    }
    setIsLoading(true);
    await onSignUp({ name, surname, email, username, password });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1, paddingTop: 0, justifyContent: "center" }}
        colors={["#ffff", "#11FFBD"]}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box
            flexDirection={"row"}
            width={"100%"}
            mt={"xl"}
            p={"ml"}
            // justifyContent={"center"}
            alignItems={"center"}
            style={{
              marginTop: -9,
              // backgroundColor: "transparent",
              // marginBottom: 15,
              marginBottom: -25,
            }}
          >
            <TouchableOpacity onPress={() => Navigation.goBack()}>
              <Ionicons name="ios-chevron-back" size={40} color="black" />
            </TouchableOpacity>
            <Text
              variant={"title1"}
              color="black"
              fontSize={28}
              letterSpacing={1.5}
              marginLeft={"xxxl"}
            >
              Inscription
            </Text>
          </Box>
          <Image
            source={require("../../../assets/logo1.png")}
            style={{
              width: 264,
              height: 164,
              alignSelf: "center",
              marginBottom: -35,
            }}
            resizeMode="stretch"
          />

          <Box
            alignItems={"center"}
            justifyContent={"space-between"}
            // flex={6.5}
            width={"100%"}
          >
            <TextInput
              leftIcon={<EvilIcons name="user" size={34} color="black" />}
              mb={"m"}
              multiline={true}
              value={name}
              onChange={setName}
              placeholder={"Nom"}
              height={60}
            />
            <TextInput
              leftIcon={<EvilIcons name="user" size={34} color="black" />}
              mb={"m"}
              multiline={true}
              value={surname}
              onChange={setSurname}
              placeholder={"Prénom"}
              height={60}
            />
            <TextInput
              leftIcon={<EvilIcons name="user" size={34} color="black" />}
              mb={"m"}
              multiline={true}
              value={username}
              onChange={setUsername}
              placeholder={"Nom d'utilisateur"}
              height={60}
            />
            <TextInput
              leftIcon={<EvilIcons name="user" size={34} color="black" />}
              mb={"m"}
              multiline={true}
              value={email}
              onChange={setEmail}
              placeholder={"Adresse Mail"}
              height={60}
            />

            <TextInput
              leftIcon={<EvilIcons name="lock" size={34} color="black" />}
              mb={"m"}
              value={password}
              multiline={false}
              secureText={isPasswordVisible}
              onChange={setPassword}
              placeholder={"Mot de Passe"}
              height={60}
              rightIcon={
                <TouchableOpacity style={RightIconStyle} onPress={showPassword}>
                  {!isPasswordVisible ? (
                    <Ionicons name="eye" size={27} color="black" />
                  ) : (
                    <Ionicons name="eye-off" size={27} color="black" />
                  )}
                </TouchableOpacity>
              }
            />
            <TextInput
              leftIcon={<EvilIcons name="lock" size={34} color="black" />}
              mb={"m"}
              value={passConfirme}
              multiline={false}
              secureText={isPasswordVisible}
              onChange={setPassConfirme}
              placeholder={"Confirmation Mot de Passe"}
              height={60}
              rightIcon={
                <TouchableOpacity style={RightIconStyle} onPress={showPassword}>
                  {!isPasswordVisible ? (
                    <Ionicons name="eye" size={27} color="black" />
                  ) : (
                    <Ionicons name="eye-off" size={27} color="black" />
                  )}
                </TouchableOpacity>
              }
            />
          </Box>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            paddingHorizontal={"m"}
            marginVertical={"ml"}
          >
            <Checkbox
              style={{ marginBottom: 15 }}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Pressable onPress={togglePressable}>
              <Text variant={"title1"} textAlign="center">
                En continuant, vous acceptez Sedispace Conditions d'utilisation
                Politique de confidentialité
              </Text>
            </Pressable>
          </Box>
          {enableSignUpBtn ? (
            <Button
              primary
              loading={isLoading}
              title="S'incrire"
              onPress={handleSignUp}
              alignSelf={"center"}
              margin={"xxl"}
            />
          ) : null}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileUpdate;
const RightIconStyle = {
  justifyContent: "center",
  alignItems: "center",
};
