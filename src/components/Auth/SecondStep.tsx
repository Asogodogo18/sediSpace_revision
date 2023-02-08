import { View } from "react-native";
import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import Avatar from "../shared/Avatar";
import { TextInput } from "react-native-gesture-handler";
import Input from "../shared/TextInput";
import { useAuth } from "../../Context/";

type SecondFirstStepProps = {
  image: string;
  name: string;
  surname: string;
  username: string;
  genre: string;
  genres: string[];
  onGenreChange: (param: string) => void;
  onNameChange: (param: string) => void;
  onSurnameChange: (param: string) => void;
  onChangeUsername: (param: string) => void;
} & Partial<BoxProps<Theme>>;

const SecondStep: React.FC<SecondFirstStepProps> = ({
  image,
  name,
  surname,
  username,
  onNameChange,
  onSurnameChange,
  onChangeUsername,
  genre,
  genres,
  onGenreChange,
  ...props
}) => {
  return (
    <Box flex={1} justifyContent={"center"} px={'xl'} alignItems={"center"} {...props}>
      <Avatar type="floating" source={{ uri: image }} />
      <Input
        placeholder="Nom"
        mt={"xxl"}
        my={"m"}
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <Input
        placeholder="Prénom"
        my={"m"}
        type="text"
        value={surname}
        onChange={onSurnameChange}
      />
      <Input
        placeholder="Nom d'utilisateur"
        my={"m"}
        type="text"
        value={username}
        onChange={onChangeUsername}
      />
      <Input
        placeholder="Sexe"
        my={"m"}
        type="dropdown"
        value={genre}
        dropdownValues={genres}
        onChange={onGenreChange}
      
        
       
      />
    </Box>
  );
};

export default SecondStep;
