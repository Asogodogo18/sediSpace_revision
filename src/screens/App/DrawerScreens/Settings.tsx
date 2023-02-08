import { Box, Avatar, Text, Line } from "../../../components";

import React from "react";
import Layout from "../../Layout";
import { ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SectionItems } from "../../../components";
import { General } from "../../../data/sectionItems";

const Settings = ({ navigation }) => {
  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
    
      >
        <Box backgroundColor={"whitishGray"} flex={1}>
          <Box
            flexDirection={"row"}
            alignItems={"center"}
            p={"xl"}
            elevation={5}
            backgroundColor={"white"}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="ios-chevron-back" size={24} color="black" />
            </TouchableOpacity>
            <Text variant={"titleBold"} style={{ marginLeft: 90 }}>
              Paramètre
            </Text>
          </Box>
          {General.map((item, index) => {
            return (
              <>
                <SectionItems
                  key={index}
                  data={item.data}
                  title={item.title}
                  navigation={navigation}
                />
                <Line
                  width={"100%"}
                  height={2}
                  alignSelf={"center"}
                  backgroundColor={"lightgreen"}
                />
              </>
            );
          })}
        </Box>
      </ScrollView>
    </Layout>
  );
};

export default Settings;
