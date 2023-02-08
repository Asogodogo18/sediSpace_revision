import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useRequestPasswordUpdateMutation,
  useSavePasswordUpdateMutation,
} from "../../Api/UserApi";
import {
  requestChange,
  saveChange,
} from "../../store/slices/passwordResetSlice";
import { toastError, toastSuccess } from "../../utils/toastHandler";

const usePasswordResetController = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [requestPasswordUpdate, { isLoading: isRequesting }] =
    useRequestPasswordUpdateMutation();
  const [savePassword, { isLoading: isSaving }] =
    useSavePasswordUpdateMutation();

  const requestPasswordChange = async (payload: string) => {
    console.log("Password change Request: ", payload);

    const formData = new FormData();
    formData.append("email", payload);
    try {
      const response = await requestPasswordUpdate(formData).unwrap();
      console.log("response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        dispatch(requestChange());
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  const changeMail = () => {
    dispatch(saveChange());
  };

  const savePasswordChange = async (payload: {
    password: string;
    confirmPass: string;
    code: string;
  }) => {
    console.log("Save Password change : ", payload);

    const formData = new FormData();
    formData.append("password", payload.password);
    formData.append("confirm_password", payload.confirmPass);
    formData.append("code", payload.code);

    try {
      const response = await savePassword(formData).unwrap();
      console.log("response: ", response);

      if (response.code !== 200) {
        throw new Error(response?.message);
      } else {
        toastSuccess(response?.message);
        dispatch(saveChange());
        navigation.goBack();
      }
    } catch (error) {
      toastError(error.toString());
    }
  };

  return {
    changeMail,
    requestPasswordChange,
    savePasswordChange,
    isSaving,
    isRequesting,
  };
};

export default usePasswordResetController;
