import React, { useState } from "react";
import Box from "../../shared/Box";
import { Button, Text, TextInput } from "../..";

import usePasswordResetController from "../../../viewController/Auth/PasswordResetController";
import { toastError } from "../../../utils/toastHandler";

const SavePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [code, setCode] = useState("");
  const { savePasswordChange, isSaving, changeMail } =
    usePasswordResetController();

  const handlePress = () => {
    if (password === "" || confirmPass === "") {
      toastError("Les champs sont vides!");
      return;
    }
    if (password !== confirmPass) {
      toastError("Les mots de passe ne sont pas identiques!");
      return;
    }
    if (code === "") {
      toastError("Vérifier votre mail pour le code!");
      return;
    }
    savePasswordChange({ password, confirmPass, code });
  };

  return (
    <Box flex={1}>
      <Text
        color={"black"}
        my={"ml"}
        fontSize={15}
        textAlign={"center"}
        variant={"subtitle"}
      >
        Veuillez Vérifier votre mail
      </Text>
      <TextInput
        mb={"m"}
        value={password}
        onChange={setPassword}
        placeholder={"Nouveau Mot de Passe"}
        alignSelf={"center"}
        elevation={3}
      />
      <TextInput
        mb={"m"}
        value={confirmPass}
        onChange={setConfirmPass}
        placeholder={"Confirmer le Mot de Passe"}
        alignSelf={"center"}
        elevation={3}
      />
      <TextInput
        mb={"m"}
        value={code}
        onChange={setCode}
        placeholder={"Code de Confirmation"}
        alignSelf={"center"}
        elevation={3}
      />
      <Button
        primary
        loading={isSaving}
        onPress={handlePress}
        title="VALIDER"
        alignSelf={"center"}
        mt={"l"}
        elevation={5}
      />
      <Button
        backgroundColor={"black"}
        primary={false}
        onPress={changeMail}
        title="Utiliser un autre mail"
        
        alignSelf={"center"}
        mt={"l"}
        elevation={0}
        
      />
    </Box>
  );
};

export default SavePassword;
