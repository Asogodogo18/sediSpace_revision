import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { View } from "react-native";
import Box from "../shared/Box";
import Text from "../shared/Text";
import { SectionInput, Line, TextInput, Button } from "../";

import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { toastSuccess } from "../../utils/toastHandler";
import { SafeAreaView } from "react-native-safe-area-context";

const Country = () => {
  const navigation = useNavigation();
  const [countrySelect, setCountrySelect] = useState("");

  const handleSubmit = () => {
    setTimeout(() => {
      toastSuccess("Enregistrer avec succès");
      navigation.goBack();
    }, 1000);

    //TODO Send data to backend
  };

  const submitControl = ["", "Pays"].every((x) => countrySelect != x);
  
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
        <Text variant={"titleBold"}  style={{marginLeft:70}}>
          Localisation
        </Text>
      </Box>
      <Box maxHeight={200}>
        <Text variant={"title"} textAlign={"center"}>
          Veuillez choisir votre Pays de résidence
        </Text>
        <TextInput
          type="dropdown"
          onChange={setCountrySelect}
          value={countrySelect}
          dropdownValues={["Pays", "Mali", "Sénégal", "Burkina Faso"]}
          alignSelf={"center"}
        />
        <Text
          variant={"title"}
          px={"ml"}
          color={"overlay"}
          textAlign={"center"}
          mt={"l"}
        >
          Choisissez le pays dans lequel vous vivez. Ces informations seront
          affichées publiquement sur votre profil.
        </Text>
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
    </Box>
    </SafeAreaView>
  );
};

export default Country;
