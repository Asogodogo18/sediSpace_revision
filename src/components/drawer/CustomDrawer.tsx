import { View, StyleSheet, Platform } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Entypo,
  EvilIcons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { useAuthController } from "../../viewController";

import Box from "../shared/Box";
import Avatar from "../shared/Avatar";
import Text from "../shared/Text";
import Button from "../shared/Button";
import { backgroundColor } from "@shopify/restyle";
import { useUserContext } from "../../Context";

const CustomDrawer = (props) => {
  const { state, progress, navigation } = props;
  const { index, routes } = state;
  const { onClickLogout } = useAuthController();
  const { user } = useUserContext();

  const isFocused = (name: string) => {
    return index === routes.findIndex((e) => e.name === name);
  };

  return (
    <Box flex={1} py={"m"}>
      <Box
        alignItems={"center"}
        height={100}
        flexDirection={"row"}
        m={"xl"}
        pt={"xxl"}
      >
        <Avatar
          type="floating"
          source={{
            uri: `${user?.avatar}`,
          }}
        />
        <Box ml={"l"} justifyContent={"center"}>
          <Text textTransform={"capitalize"} fontSize={15} variant={"title1"}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text fontSize={12} variant={"caption"}>
            @{user?.user_name}
          </Text>
        </Box>
      </Box>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Entypo
                name="home"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Accueil
              </Text>
            );
          }}
          style={[
            isFocused("Accueil")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Accueil")}
          focused={isFocused("Accueil")}
        />
        <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MaterialCommunityIcons
                name="account"
                size={focused ? 38 : 30}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Profile
              </Text>
            );
          }}
          style={[
            isFocused("Profile")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Profile", { self: true })}
          focused={isFocused("Profile")}
        />
        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MaterialCommunityIcons
                name="book-open-variant"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Education
              </Text>
            );
          }}
          style={[
            isFocused("Education")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Education")}
          focused={isFocused("Education")}
        /> */}
        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MaterialCommunityIcons
                name="apps"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Nos Outils
              </Text>
            );
          }}
          style={[
            isFocused("Tools")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Tools")}
          focused={isFocused("Tools")}
        /> */}
        <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Fontisto
                name="favorite"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Favoris
              </Text>
            );
          }}
          style={[
            isFocused("Favoris")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Favoris")}
          focused={isFocused("Favoris")}
        />
        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <MaterialIcons
                name="article"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Sujets d'Actualité
              </Text>
            );
          }}
          style={[
            isFocused("Topics")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Topics")}
          focused={isFocused("Topics")}
        /> */}

        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Entypo
                name="message"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Message
              </Text>
            );
          }}
          style={[
            isFocused("Messages")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Messages")}
          focused={isFocused("Messages")}
        /> */}
        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Ionicons
                name="search"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Recherche
              </Text>
            );
          }}
          style={[
            isFocused("Search")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Search")}
          focused={isFocused("Search")}
        /> */}
        {/* <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Ionicons
                name="notifications"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Notifications
              </Text>
            );
          }}
          style={[
            isFocused("Notifications")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Notifications")}
          focused={isFocused("Notifications")}
        /> */}
        <DrawerItem
          pressColor="lightgreen"
          icon={({ focused, color, size }) => (
            <Box
              width={40}
              backgroundColor={"nobg"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Ionicons
                name="settings"
                size={focused ? 28 : 24}
                color={focused ? "white" : "#666666"}
              />
            </Box>
          )}
          label={({ focused }) => {
            return (
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                Réglages
              </Text>
            );
          }}
          style={[
            isFocused("Parametre")
              ? styles.activeContainer
              : styles.inActiveContainer,
            { paddingLeft: 25 },
          ]}
          onPress={() => navigation.navigate("Parametre")}
          focused={isFocused("Parametre")}
        />
        {/* <Drawer.Screen name="Search" component={Search} />

<Drawer.Screen name="Messages" component={Messages} />
<Drawer.Screen name="Notifications" component={Notifications} /> */}
      </DrawerContentScrollView>
      <Button
        title="se déconnecter"
        primary={false}
        onPress={onClickLogout}
        textProps={{ fontSize: Platform.OS == "ios" ? 10 : 12, color: "black" }}
        borderColor={"danger"}
        marginLeft={"xl"}
        width={170}
        height={40}
        marginBottom={"ml"}
      />
    </Box>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  drawerContentContainerStyle: {
    paddingTop: 0,
  },

  activeContainer: {
    backgroundColor: "rgba(20,125,31,0.8)",
    borderRadius: 15,
    marginTop: 0,
    height: 50,
  },

  activeText: {
    fontWeight: "600",
    color: "#FFF",
    backgroundColor: "transparent",
    fontSize: 14,
  },

  inActiveContainer: {
    borderLeftWidth: 0,
    borderLeftColor: "transparent",
    backgroundColor: "transparent",
    borderRadius: 0,
    marginTop: 0,
  },

  inactiveText: {
    fontWeight: "400",
    color: "black",
    backgroundColor: "transparent",
    fontSize: 12,
  },
});
