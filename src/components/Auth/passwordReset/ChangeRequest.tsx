import { TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Box from "../../shared/Box";
import Button from "../../shared/Button";
import Text from "../../shared/Text";
import { TextInput } from "../..";
import usePasswordResetController from "../../../viewController/Auth/PasswordResetController";

const ChangeRequest = () => {
  const { requestPasswordChange, isRequesting } = usePasswordResetController();

  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [switchController, setSwitchController] = useState(true);

  const handlePress = () => {
    requestPasswordChange(email);
  };

  return (
    <Box flex={1}>
      {switchController ? (
        <TextInput
          mb={"m"}
          value={email}
          onChange={setEmail}
          placeholder={"Votre adresse mail"}
          alignSelf={"center"}
          elevation={5}
          shadowColor={'black'}
          shadowOffset={{
            height:2,width:1
          }}
        />
      ) : (
        <TextInput
          mb={"m"}
          value={telephone}
          onChange={setTelephone}
          placeholder={"Votre Numero de Téléphone"}
          alignSelf={"center"}
          elevation={5}
          shadowColor={'black'}
          shadowOffset={{
            height:2,width:1
          }}
        />
      )}

      {!switchController ? (
        <TouchableOpacity
          onPress={() => setSwitchController(true)}
          style={{ position: "relative", right: 0, left: 240 }}
        >
          <Text variant={"title"} color={"overlay"}>
            Utiliser Email
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setSwitchController(false)}
          style={{ position: "relative", right: 0, left: 90 }}
        >
          <Text variant={"title"} textAlign={"center"} color={"overlay"}>
            Utiliser Telephone
          </Text>
        </TouchableOpacity>
      )}

      <Button
        primary
        loading={isRequesting}
        onPress={handlePress}
        title="VALIDER"
        alignSelf={"center"}
        mt={"l"}
        elevation={5}
      />
    </Box>
  );
};

export default ChangeRequest;
