import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import Box from "../shared/Box";
import Text from "../shared/Text";
import { Button, TextInput } from "../";

import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { toastSuccess } from "../../utils/toastHandler";
import { SafeAreaView } from "react-native-safe-area-context";

const Language = () => {
  const navigation = useNavigation();
  const [langageSelect, setLangageSelect] = useState("");

  const handleSubmit = () => {
    setTimeout(() => {
      toastSuccess("Enregistrer avec succès");
      navigation.goBack();
    }, 1000);

    //TODO Send data to backend
  };

  const submitControl = ["", "Langue"].every((x) => langageSelect != x);
  return (
    <SafeAreaView style={{flex:1}}>
    <Box flex={1}>
      <Box
        flexDirection={"row"}
        width={"100%"}
        mt={"xl"}
        p={"ml"}
        // justifyContent={"center"}
        alignItems={"center"}
      style={{marginTop:-9,backgroundColor:'white',elevation:5,marginBottom:15}}

      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <Text variant={"titleBold"} marginLeft={"xl"}>
          Langue d'affichage
        </Text>
      </Box>
      <Box maxHeight={200} margin={'xl'}>
        <Text variant={"title"} textAlign={"center"} margin={'l'}>
          Choisissez la langue d'affichage
        </Text>
        <TextInput
          height={50}
          type="dropdown"
          onChange={setLangageSelect}
          value={langageSelect}
          dropdownValues={["Langue", "Français", "Anglais", "Arabe"]}
          alignSelf={"center"}
        />
        <Text variant={"title"} p={"ml"} color={"overlay"} textAlign={"center"} letterSpacing={1.5}>
          Choisissez la langue de votre choix pour l'interface de votre compte.
          Cela n'affecte pas la langue du contenu que vous voyez dans votre flux
          d'actualité.
        </Text>
      </Box>
      {submitControl && (
        <Button
          primary
          alignSelf={"center"}
          loading={false}
          title="Enregistrer"
          onPress={handleSubmit}
          mt={"xl"}
        />
      )}
    </Box>
    </SafeAreaView>
  );
};

export default Language;
