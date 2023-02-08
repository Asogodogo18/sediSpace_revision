import React, { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import useUserController from "../../viewController/Users/UserController";

import Box from "../shared/Box";
import Text from "../shared/Text";
import { SectionInput, Line, Button, Step5 } from "../";
import Input from "../shared/TextInput";
import { toastError, toastSuccess } from "../../utils/toastHandler";
import { useAuthController } from "../../viewController";
import { SafeAreaView } from "react-native-safe-area-context";

const Securite = () => {
  const navigation = useNavigation();
  const { updateUserPrivacy } = useAuthController();
  const { updateUserPassword } = useUserController();
  const [dataUpdated, setDataUpdated] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [privacy1, setPrivacy1] = useState("");
  const [privacy2, setPrivacy2] = useState("");
  const [privacy3, setPrivacy3] = useState("");

  const pass = [
    {
      label: "Mot de Passe",
      value: passWord,
      placeholder: "*******",
      onChange: (text: string) => setPassWord(text),
    },
    {
      label: "Confirmer Mot de Passe",
      value: passwordConfirm,
      placeholder: "*******",
      onChange: (text: string) => setPasswordConfirm(text),
    },
  ];

  useEffect(() => {
    EventRegister.addEventListener("user profile updated", () => {
      if (!dataUpdated) setDataUpdated(true);
    });
    return () => {
      EventRegister.removeEventListener("user profile updated");
    };
  }, []);

  const handleSubmitPassword = () => {
    if (passWord == "" || passwordConfirm == "") {
      toastError("Veuillez remplir les champs!");
      return;
    }
    if (passWord !== passwordConfirm) {
      toastError("Les mots de passe ne sont pas identiques !");
      return;
    }
    updateUserPassword({ password: passWord });
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

  const showPrivacyButton =
    ["", "Qui peut voir mon profil?"].every((x) => privacy1 != x) &&
    ["", "Qui peut m'envoyer un message?"].every((x) => privacy2 != x) &&
    ["", "Afficher votre profil dans les moteurs de recherche?"].every(
      (x) => privacy3 != x
    );

  const submitProfile = async () => {
    const payload = { privacy1, privacy2, privacy3 };
    try {
      const res = await updateUserPrivacy(payload);

      console.log("reponse: ", res);

      if (res.status === 200) {
        toastSuccess(res.message);
        onPrivacy1Change("");
        onPrivacy2Change("");
        onPrivacy3Change("");
      } else toastError(res.message);
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <Box flex={1}>
      <Box
        flexDirection={"row"}
        width={"100%"}
        mt={"xl"}
        p={"ml"}
        alignItems={"center"}
      style={{marginTop:-9,backgroundColor:'white',elevation:5}}

      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text variant={"titleBold"} marginLeft={"m"}>
          Sécurité et Confidentialité
        </Text>
      </Box>
      <SectionInput data={pass} title="Sécurité" />
      {[dataUpdated, passWord, passwordConfirm].every(Boolean) && (
        <Button
          primary
          alignSelf={"center"}
          loading={false}
          title="Enregistrer"
          onPress={handleSubmitPassword}
          mb={"xl"}
        />
      )}
      <Line
        width={"100%"}
        height={2}
        alignSelf={"center"}
        backgroundColor={"lightgreen"}
        mb={"ml"}
      />
      <Text
        mb={"xxl"}
        pl={"m"}
        color={"grayDark"}
        textTransform={"capitalize"}
        variant={"title"}
      >
        Confidentialité
      </Text>

      <Box minHeight={170} maxHeight={210} width={"100%"} margin={'ml'}>
        <Step5
          privacy1={privacy1}
          privacy2={privacy2}
          privacy3={privacy3}
          onPrivacy1Change={onPrivacy1Change}
          onPrivacy2Change={onPrivacy2Change}
          onPrivacy3Change={onPrivacy3Change}
        />
      </Box>
      {showPrivacyButton && (
        <Button
          primary
          alignSelf={"center"}
          loading={false}
          title="Enregistrer"
          onPress={submitProfile}
          mb={"xl"}
        />
      )}
      <Line
        width={"100%"}
        height={2}
        alignSelf={"center"}
        backgroundColor={"lightgreen"}
        mb={"ml"}
      />
      <TouchableOpacity
        style={{ justifyContent: "flex-start", marginVertical: 0 }}
      >
        <Text
          variant={"title"}
          fontSize={18}
          marginLeft={"xl"}
          color={"grayDark"}
        >
          Supprimer Votre Profil
        </Text>
      </TouchableOpacity>
    </Box>
    </SafeAreaView>
  );
};

export default Securite;
