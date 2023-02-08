import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { SectionInput, TextInput, Line, Text, Box, Button } from "../";

import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Verify = () => {
  const [fullName, setFullName] = useState("");
  const [msgReviseur, setmsgReviseur] = useState("");
  const navigation = useNavigation();
  const nomComplet = [
    {
      label: "Entre Votre Nom Complet",
      value: fullName,
      onChange: (text) => setFullName(text),
    },
  ];
  const MessageReviseur = [
    {
      label: "Entre le message au réviseur",
      value: msgReviseur,
      onChange: (text) => setmsgReviseur(text),
    },
  ];
  const [image, setImage] = useState([]);

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage([...image, { ...result }]);
      //console.log("image", image);
    }
  };
  const onRemove = (index) => {
    setImage([
      ...image.slice(0, index),
      ...image.slice(index + 1, image.length),
    ]);
  };
  const condition = fullName && msgReviseur && image;
  return (
    <SafeAreaView style={{flex:1}}>
        <Box
          flexDirection={"row"}
          backgroundColor={"white"}
          elevation={5}
          height={50}
          width={"100%"}
          mt={"xl"}
          p={"ml"}
          // justifyContent={"center"}
          alignItems={"center"}
      style={{marginTop:-9,backgroundColor:'white',elevation:5}}

        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text variant={"titleBold"} marginLeft={"xl"}>
            Verification du Compte
          </Text>
        </Box>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Box>
          <Box>
            <Text variant={"subheader"} textAlign={"center"} p={"xl"}>
              Choisissez votre langage d'affichage
            </Text>
            <SectionInput data={nomComplet} title="Nom Complet" />
            <Line
              width={"100%"}
              height={2}
              alignSelf={"center"}
              backgroundColor={"lightgreen"}
            />
            <SectionInput data={MessageReviseur} title="Message au Reviseur" />
            <Line
              width={"100%"}
              height={2}
              alignSelf={"center"}
              backgroundColor={"lightgreen"}
            />
            <Text variant={"title"} m={"xl"}>
              Message Vidéo
            </Text>
            <TouchableOpacity
              onPress={pickVideo}
              style={{
                minHeight: 70,
                maxHeight: 275,
                width: "90%",
                borderWidth: 1.5,
                borderColor: "lightgreen",
                borderStyle: "dashed",
                alignSelf: "center",
                backgroundColor: "lightgray",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image ? (
                <Text variant={"title"} m={"xl"} textAlign={"center"}>
                  Veuillez sélectionner un Message Vidéo pour le Reviseur
                </Text>
              ) : null}
              {image.map((image, index) => {
                return (
                  <Box
                    style={{
                      width: 180,
                      height: 180,

                      marginTop: 10,
                      elevation: 0,
                      borderRadius: 10,
                      //overflow: "hidden",
                      //alignContent: "center",

                      // marginLeft: 5,
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
                      <Entypo name="circle-with-cross" size={27} color="red" />
                    </TouchableOpacity>
                    <Image
                      source={{ uri: image.uri }}
                      style={{ height: "100%", width: "100%" }}
                      resizeMode="cover"
                      key={index}
                    />
                  </Box>
                );
              })}
            </TouchableOpacity>
            <Text
              variant={"title"}
              p={"ml"}
              color={"overlay"}
              textAlign={"center"}
              mt={"xl"}
            >
              Veuillez noter que ce matériel ne sera ni publié ni partagé avec
              des tiers. Nous demandons ces informations uniquement pour
              vérifier l'authenticité de votre identité afin de vérifier
              davantage votre compte! Pour ce faire, nous avons besoin de vous
              pour enregistrer une vidéo de plus de plus d'une minute, en tenant
              votre passeport / ID dans votre main droite pour une vision claire
              de votre visage et des données de votre document, en plus de
              donner votre nom complet et aussi le surnom d'utilisateur que vous
              utilisez sur notre site Web
            </Text>
          </Box>
        </Box>
      </ScrollView>

      {condition && (
        <Button
          primary
          title="Envoyer la demande"
          width={250}
          onPress={() => {}}
          alignSelf={"center"}
        />
      )}
    </SafeAreaView>
  );
};

export default Verify;
