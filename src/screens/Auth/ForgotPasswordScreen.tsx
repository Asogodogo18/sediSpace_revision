import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Box, Text } from "../../components";
import { AntDesign } from "@expo/vector-icons";
import Banner from "../../../assets/bg_forgot.svg";
import Logo from "../../../assets/logo_forgot_password.svg";
import { useSelector } from "react-redux";
import ChangeRequest from "../../components/Auth/passwordReset/ChangeRequest";
import SavePassword from "../../components/Auth/passwordReset/SavePassword";
import { selectResetStatus } from "../../store/slices/passwordResetSlice";
import { SafeAreaView } from "react-native-safe-area-context";
const { height, width } = Dimensions.get("screen");

const ForgotPasswordScreen = ({ navigation }) => {
  const status = useSelector(selectResetStatus);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 5, margin: 5 }}
        >
          <AntDesign name="left" size={40} color="black" />
        </TouchableOpacity>

        <Text
          variant={"subheader"}
          style={{
            width: 350,
            alignSelf: "center",
            fontSize: 36,
            textAlign: "center",
            fontWeight:Platform.OS === 'ios' ?"400":"bold",
            textTransform: "uppercase",
            letterSpacing: 1.5,
          }}
        >
          RECUPERATION MOT de PASSE
        </Text>
        <Logo
          height={200}
          width={250}
          style={{
            overflow: "hidden",
            position: "relative",
            alignSelf: "center",
          }}
        />
        {status === "uninitialized" ? <ChangeRequest /> : <SavePassword />}
        <Banner
          style={{
            position: "absolute",
            zIndex: -10,
            bottom: 0,
            width:width*50,
            alignSelf: "center",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
