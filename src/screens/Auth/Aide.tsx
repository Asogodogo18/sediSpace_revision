import { Ionicons, Feather, Entypo } from "@expo/vector-icons";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  Pressable,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Box, Text } from "../../components";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");
const contacte =  "00 223 20 71 93 33"
const subject = "Mail Subject";
const message = "Message Body";
const Aide = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/support.jpg")}
        style={{
          height,
          width,
        }}
        resizeMode="contain"
      >
        <Box
          flexDirection={"row"}
          width={"100%"}
          alignItems={"center"}
          height={55}
          style={{}}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="ios-chevron-back" size={40} color="black" />
          </TouchableOpacity>
          <Text
            variant={"title1"}
            color="black"
            fontSize={Platform.OS === "ios" ? 20 : 28}
            letterSpacing={1.5}
            style={{
              marginLeft: 85,
            }}
          >
            Support
          </Text>
        </Box>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* //Header */}
          <Box
            position={"absolute"}
            top={50}
            alignSelf={"center"}
            px={"l"}
            borderRadius={10}
            minHeight={120}
            width={Platform.OS === "ios" ? "90%" : "85%"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            backgroundColor="darkOverlay"
          >
            <MaterialIcons name="support-agent" size={54} color="white" />
            <Text
              color={"white"}
              variant={"title1"}
              mb={"ml"}
              textAlign={"center"}
              fontSize={Platform.OS === "ios" ? 14 : 16}
            >
              Obtenez l'aide dont vous avez besoin
            </Text>
          </Box>
          {/* //content */}
          <Box
            position={"absolute"}
            // top={80}
            alignSelf={"center"}
            px={"l"}
            borderRadius={10}
            minHeight={300}
            width={Platform.OS === "ios" ? "90%" : "90%"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            backgroundColor="darkOverlay2"
          >
            <Text
              color={"white"}
              variant={"title1"}
              mb={"ml"}
              textAlign={"center"}
              fontSize={Platform.OS === "ios" ? 12 : 15}
            >
              Veuillez nous contacter pour votre assistance à travers nos canaux
              suivants:
            </Text>
            <Box px={"s"}>
              <Box my={"m"} flexDirection={"row"} alignItems={"center"}>
                <Box
                  width={28}
                  height={28}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={60}
                  backgroundColor={"white"}
                  elevation={2}
                >
                  <Feather name="phone" size={18} color="green" />
                </Box>
                <Pressable onPress={() => Linking.openURL(`tel:${contacte}`)}>
                  <Text
                    color={"white"}
                    fontWeight={"400"}
                    marginLeft={"ml"}
                    variant={"title1"}
                    fontSize={Platform.OS === "ios" ? 12 : 13}
                  >
                    00 223 20 71 93 33
                  </Text>
                </Pressable>
              </Box>
              <Box my={"m"} flexDirection={"row"} alignItems={"center"}>
                <Box
                  width={28}
                  height={28}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={60}
                  backgroundColor={"white"}
                  elevation={2}
                >
                  <Feather name="mail" size={18} color="green" />
                </Box>
                <Pressable onPress={() => Linking.openURL(`mailto:info@clusterdigitalafrica.com?subject=${subject}&body=${message}`)}>
                  <Text
                    fontWeight={"400"}
                    color={"white"}
                    marginLeft={"ml"}
                    variant={"title1"}
                    fontSize={Platform.OS === "ios" ? 10.5 : 13}
                  >
                    info@clusterdigitalafrica.com
                  </Text>
                </Pressable>
              </Box>
              <Box my={"m"} flexDirection={"row"} alignItems={"center"}>
                <Box
                  width={28}
                  height={28}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderRadius={60}
                  backgroundColor={"white"}
                  elevation={2}
                >
                  <Entypo name="location" size={18} color="green" />
                </Box>
                <Pressable onPress={() => console.log("hi")}>
                  <Text
                    fontWeight={"400"}
                    color={"white"}
                    marginLeft={"ml"}
                    variant={"title1"}
                    fontSize={Platform.OS === "ios" ? 12 : 13}
                  >
                    Sotuba ACI, Bamako/Mali
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        </ScrollView>
        <Box
          position={"absolute"}
          bottom={5}
          alignItems={"center"}
          justifyContent={"center"}
          alignSelf={"center"}
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
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Aide;
