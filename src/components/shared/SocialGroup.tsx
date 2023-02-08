import React, { ReactNode } from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../../theme.android";
import Box from "./Box";

// @params
// @onPress function qui affiche soit un modal ou une page detail pour interfacer la connexion 3rd-party en fonction u choix du user.
// onPress a pour parametre Social qui contient le nom de du choix du user

const socialList: {
  id: string;
  name: string;
  icon: ReactNode;
}[] = [
  {
    id: "2",
    name: "google",
    icon: <FontAwesome5 name="google" size={48} color="white" />,
  },
  {
    id: "3",
    name: "linkedIn",
    icon: <FontAwesome5 name="linkedin" size={48} color="white" />,
  },
  {
    id: "1",
    name: "facebook",
    icon: <FontAwesome5 name="facebook" size={48} color="white" />,
  },

  {
    id: "4",
    name: "instagran",
    icon: <FontAwesome5 name="instagram" size={48} color="white" />,
  },
];

type SocialGroupProps = {
  onPress: (param: any) => void;
  loading?: boolean;
} & Partial<BoxProps<Theme>>;

const SocialGroup: React.FC<SocialGroupProps> = ({ onPress, ...props }) => (
  <Box
    flexDirection={"row"}
    width={300}
    height={50}
    px="m"
    alignItems={"center"}
    justifyContent="space-between"
    backgroundColor={"nobg"}
    {...props}
  >
    {socialList.map((social, index) => (
      <TouchableOpacity
        key={social.id}
        {...props}
        onPress={() => onPress(social)}
      >
        {social.icon}
      </TouchableOpacity>
    ))}
  </Box>
);

export default SocialGroup;
