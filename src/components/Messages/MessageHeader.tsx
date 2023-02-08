import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Box from "../shared/Box";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Avatar from "../shared/Avatar";
import Text from "../shared/Text";

import Menu, {
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import IconContainer from "../shared/IconContainer";

type MessageHeaderProps = {
  user: any;
  onGoBack: () => void;
  onMenuPress: () => void;
};

const Header: React.FC<MessageHeaderProps> = ({ user, onGoBack }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const onMenuPress = () => {
    setOpenMenu(!openMenu);
  };

  const onBackdropPress = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      width={"100%"}
      height={60}
      backgroundColor={"white"}
      flexDirection={"row"}
      px={"s"}
    >
      <TouchableOpacity
        onPress={onGoBack}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: 20,
        }}
      >
        <Ionicons name="chevron-back-sharp" size={40} color="#434343" />
      </TouchableOpacity>
      <Avatar type="header" source={{ uri: user?.avatar }} />
      <Box
        position={"absolute"}
        top={0}
        bottom={0}
        right={0}
        left={0}
        alignItems={"center"}
        mx={"xl"}
        justifyContent={"center"}
      >
        <Text variant={"title1"}>{user?.name}</Text>
        <Text mt={"s"} variant={"caption"} fontSize={12}>
          {user?.username}
        </Text>
      </Box>
      <TouchableOpacity
        onPress={onMenuPress}
        style={{ position: "absolute", alignSelf: "center", right: 10 }}
      >
        <SimpleLineIcons name="options-vertical" size={20} color="#848383" />
        <Menu
          opened={openMenu}
          // renderer={renderers.Popover}
          // rendererProps={{ preferredPlacement: "right" }}
          onBackdropPress={onBackdropPress}
        >
          <MenuTrigger />

          <MenuOptions>
            <MenuOption onSelect={() => {}}>
              <IconContainer>
                <Text ml={"ml"}>Supprimer la conversation</Text>
                {/*
                component when post is bookmarked
                <MaterialCommunityIcons name="bookmark-check" size={24} color="black" /> */}
              </IconContainer>
            </MenuOption>

            <MenuOption onSelect={() => {}}>
              <IconContainer>
                <Text ml={"ml"}>Effacer la discussion</Text>
              </IconContainer>
            </MenuOption>

            <MenuOption onSelect={() => {}}>
              <IconContainer>
                <Text ml={"ml"} color={"danger"}>
                  Bloquer cet utilsateur
                </Text>
              </IconContainer>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
