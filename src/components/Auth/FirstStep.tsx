import React, { useState } from "react";
import { BoxProps } from "@shopify/restyle";
import * as ImagePicker from "expo-image-picker";

import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import { Button, Image } from "react-native";
import Avatar from "../shared/Avatar";

type FirstStepProps = {
  image: string;
  onPress: (param: string) => void;
} & Partial<BoxProps<Theme>>;

const FirstStep: React.FC<FirstStepProps> = ({ image, onPress, ...props }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    ////console.log(result);

    if (!result.cancelled) {
      onPress(result.uri);
    }
  };

  return (
    <Box
      flex={1}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      {...props}
    >
      <Avatar type="main" source={{ uri: image }} onPress={pickImage} />
      <Button title="Sélectionner une image" onPress={pickImage} />
      
    </Box>
  );
};

export default FirstStep;
