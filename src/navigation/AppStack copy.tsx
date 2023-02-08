import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useDrawerProgress,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import BottomSheet from "@gorhom/bottom-sheet";

import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { Box, CustomDrawerContent, TabBarButton, Text } from "../components";
import Layout from "../screens/Layout";
//Details Screens
import PostDetails from "../screens/App/Details/PostDetails";
//Chats Screens
import { Chats, NewMessage } from "../screens";
import {
  Education,
  Favorite,
  Home,
  Messages,
  Notifications,
  Profile,
  Search,
  Tools,
  Topics,
  Parametre,
  InnerParams,
  PosteScreens,
  FollowScreen,
} from "../screens";

import HOME_ICON from "../../assets/icons/Home.svg";
import SEARCH_ICON from "../../assets/icons/Search.svg";
import MSG_ICON from "../../assets/icons/Msg.svg";
import BELL_ICON from "../../assets/icons/Notif.svg";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const StackApp = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen
        name="Publication"
        component={PostDetails}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="PosteScreens" component={PosteScreens} />
      <Stack.Screen name="NewMessage" component={NewMessage} />
      <Stack.Screen
          name="HomeStack"
          component={Home}
          // options={{
          //   tabBarIcon: ({ focused }) => (
          //     <Box
          //       justifyContent={"center"}
          //       alignItems={"center"}
          //       style={{ marginTop: Platform.OS === "ios" ? 25 : 0 }}
          //     >
          //       <HOME_ICON style={{ color: focused ? "#0ABD1C" : "#D6DBDE" }} />
          //       <Text variant={focused ? "tabTextActive" : "tabText"}>
          //         Accueil
          //       </Text>
          //     </Box>
          //   ),
          // }}
        />
    </Stack.Navigator>
  );
};

const ParametreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Parametre" component={Parametre} />

      <Stack.Screen name="InnerParams" component={InnerParams} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#EFF9FB", "#77FFD9"]}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          headerBackground: () => <View style={styles.transparentHeader} />,
          drawerType: "back",
          overlayColor: "transparent",
          drawerStyle: styles.drawerStyles,
          drawerActiveBackgroundColor: "lightgreen",
          drawerActiveTintColor: "purple",
          drawerContentContainerStyle: styles.container,
          sceneContainerStyle: styles.scene,
        }}
      >
        <Drawer.Screen
          name="Accueil"
          options={{ headerShown: false }}
          component={StackApp}
        />

        <Drawer.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Drawer.Screen
          name="Education"
          options={{ headerShown: false }}
          component={Education}
        />
        <Drawer.Screen
          name="Tools"
          options={{ headerShown: false }}
          component={Tools}
        />
        <Drawer.Screen
          name="Favoris"
          options={{ headerShown: false }}
          component={Favorite}
        />
        <Drawer.Screen
          name="Topics"
          options={{ headerShown: false }}
          component={Topics}
        />
        <Drawer.Screen
          name="Parametre"
          options={{ headerShown: false, title: "Parametre" }}
          component={ParametreStack}
        />
        <Drawer.Screen
          name="Follow"
          options={{ headerShown: false }}
          component={FollowScreen}
        />
        
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const BottomTabNavigator = () => {
  return (
    <Layout>
      <BottomTab.Navigator
        initialRouteName="HomeStack"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#FFFF",
            height:60,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeStack"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                style={{ marginTop: Platform.OS === "ios" ? 25 : 0 }}
              >
                <HOME_ICON style={{ color: focused ? "#0ABD1C" : "#D6DBDE" }} />
                <Text variant={focused ? "tabTextActive" : "tabText"}>
                  Accueil
                </Text>
              </Box>
            ),
          }}
        />
        <BottomTab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarIcon: ({ focused }) => (
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                style={{ marginTop: Platform.OS === "ios" ? 25 : 0 }}
              >
                <SEARCH_ICON
                  style={{ color: focused ? "#0ABD1C" : "#D6DBDE" }}
                />
                <Text variant={focused ? "tabTextActive" : "tabText"}>
                  Recherche
                </Text>
              </Box>
            ),
          }}
        />
        <BottomTab.Screen
          name="Add"
          component={""}
          options={{
            // tabBarIcon: ({ focused }) => (
            //   <Ionicons name="add" size={36} color="white" />
            // ),
            tabBarButton: (props) => (
              // <CustomTabBarButton onPress={PosteScreens} {...props} />
              <TabBarButton {...props} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Messages"
          component={Messages}
          options={{
            tabBarIcon: ({ focused }) => (
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                style={{ marginTop: Platform.OS === "ios" ? 25 : 0 }}
              >
                <MSG_ICON style={{ color: focused ? "#0ABD1C" : "#D6DBDE" }} />
                <Text variant={focused ? "tabTextActive" : "tabText"}>
                  Messagerie
                </Text>
              </Box>
            ),
          }}
        />
        <BottomTab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ focused }) => (
              <Box
                justifyContent={"center"}
                alignItems={"center"}
                style={{ marginTop: Platform.OS === "ios" ? 25 : 0 }}
              >
                <BELL_ICON style={{ color: focused ? "#0ABD1C" : "#D6DBDE" }} />
                <Text variant={focused ? "tabTextActive" : "tabText"}>
                  Notifications
                </Text>
              </Box>
            ),
          }}
        />
      </BottomTab.Navigator>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: Platform.OS === "ios" ? "center" : null,
  },
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: Platform.OS === "android" ? 10 : 50,
    right: 16,
    left: 16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "lightgreen",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "orange",
  },
  scene: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    backgroundColor: "transparent",
  },
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: "hidden",
  },
  transparentHeader: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawerStyles: { flex: 1, width: "80%", backgroundColor: "transparent" },
});

export default AppStack;
