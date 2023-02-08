import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  TextInput,
  Button,
  AuthSectionDivider,
  SocialIconGroup,
} from "../../components";
import {
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { BallIndicator } from "react-native-indicators";

import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { useAuthController } from "../../viewController";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../Context/AuthContext";
import { getDataObject } from "../../services/storage";
import { useUserContext } from "../../Context";
import { USER_KEY } from "../../constants/general-constants";
import { toastError } from "../../utils/toastHandler";
import { Platform } from "expo-modules-core";
const { height, width } = Dimensions.get("screen");

const isIphone = Platform.OS == "ios";

const Auth = ({ navigation }) => {
  const { updateEmail, updatePassword } = useAuth();
  const {
    email,
    password,
    error,
    onChangeEmail,
    onChangePassword,
    onClickLogin,
    isLoading,
  } = useAuthController();
  const { signedIn, onSignInSuccess } = useUserContext();

  const [sessionCheck, setSessionCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const toggleModal = () => setModalVisible(!modalVisible);
  const showPassword = () => setIsPasswordVisible(!isPasswordVisible);

  const handleSignUp = () => {
    navigation.navigate("Inscription");
  };

  const Initialization = async () => {
    setSessionCheck(true);
    let storedUserToken = await getDataObject(USER_KEY);
    let storedAuthToken = await getDataObject("auth");

    //console.log("stored Auth: ", storedAuthToken);
    //console.log("stored User: ", storedUserToken);
    if (storedUserToken) {
      onSignInSuccess({ user: storedUserToken, auth: storedAuthToken });

      setSessionCheck(false);
    }
    setSessionCheck(false);
  };

  useEffect(() => {
    Initialization();

    return () => {};
  }, []);

  if (sessionCheck) {
    return (
      <Box flex={1} justifyContent={"center"} alignItems={"center"}>
        <Box position={"absolute"}>
          <BallIndicator color="green" size={50} animating interaction />
        </Box>
        <Text
          variant={"body1"}
          textAlign={"center"}
          style={{ marginTop: 130, fontWeight: "600" }}
        >
          Veuillez patienter pendant que nous restaurons votre session
          précédente.{" "}
        </Text>
      </Box>
    );
  }
  return (
    <ImageBackground
      source={require("../../../assets/Auth/bg2.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          flex={1}
          backgroundColor={"overlay"}
        >
          <Box
            alignItems={"center"}
            justifyContent={"flex-end"}
            flex={2.8}
            style={{
              position: "relative",
              top: Platform.OS === "ios" ? -30 : -50,
              marginBottom: -120,
            }}
            pt={"m"}
          >
            <Image
              source={require("../../../assets/logo1.png")}
              style={{
                width: 274,
                height: 274,
              }}
              resizeMode="contain"
            />

            {/* <Text variant={"subheader"} color="white" marginTop={"xxxl"}>
              SED
            </Text> */}
          </Box>
          <Box
            alignItems={"center"}
            justifyContent={"space-around"}
            flex={6.5}
            width={"100%"}
          >
            <TextInput
              leftIcon={<EvilIcons name="user" size={34} color="white" />}
              mb={"m"}
              multiline={true}
              value={email}
              onChange={onChangeEmail}
              placeholder={"Adresse Mail"}
              height={60}
            />
            <TextInput
              leftIcon={<EvilIcons name="lock" size={34} color="white" />}
              mb={"m"}
              value={password}
              multiline={false}
              secureText={isPasswordVisible}
              onChange={onChangePassword}
              placeholder={"Mot de Passe"}
              height={60}
              rightIcon={
                <TouchableOpacity style={RightIconStyle} onPress={showPassword}>
                  {!isPasswordVisible ? (
                    <Ionicons name="eye" size={27} color="white" />
                  ) : (
                    <Ionicons name="eye-off" size={27} color="white" />
                  )}
                </TouchableOpacity>
              }
            />
            <Button
              primary
              loading={isLoading}
              title="Se Connecter"
              onPress={onClickLogin}
            />
            <Button primary={false} title="S'inscrire" onPress={handleSignUp} />
            {/* <AuthSectionDivider /> */}
            {/* <SocialIconGroup onPress={() => {}} /> */}
          </Box>
          <Box
            flexDirection={"row"}
            flex={1.5}
            px={"l"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Mpo")}>
              <Text variant={"body"} color="white">
                Mot de Passe Oublié ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Aide")}>
              <Text variant={"body"} color="white">
                Aide
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>

        {modalVisible && (
          <ConfirmationModal
            // password={password}
            modalVisible={modalVisible}
            ToggleModal={toggleModal}
          />
        )}
      </ScrollView>
    </ImageBackground>
  );
};

function ConfirmationModal({ modalVisible, ToggleModal }) {
  const navigation = useNavigation();
  const { password, password1, onChangePassword1 } = useAuthController();

  //console.log("modal 1:", password);
  //console.log("modal 2:", password1);

  const handleValidate = () => {
    // if (password !== password1) {
    //   toastError("Les mots de passe ne sont pas identiques");
    //   return;
    // }
    ToggleModal();
    navigation.navigate("ProfileUpdate");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        ToggleModal();
      }}
      onDismiss={ToggleModal}
    >
      <TouchableWithoutFeedback onPress={ToggleModal} accessible={false}>
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Box
            style={{ marginBottom: isIphone ? 100 : 0 }}
            minHeight={250}
            borderRadius={10}
            padding={"ml"}
            backgroundColor={"white"}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Text variant={"title"} fontSize={18} textAlign={"center"}>
              Veuillez Confirmer le{"\n"} Mot de passe
            </Text>
            <TextInput
              my={"m"}
              borderWidth={1}
              borderColor={"gray"}
              value={password1}
              onChange={onChangePassword1}
              placeholder={"Mot de Passe"}
            />
            <Button primary={true} title="Valider" onPress={handleValidate} />
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
export default Auth;

const RightIconStyle = {
  justifyContent: "center",
  alignItems: "center",
};
