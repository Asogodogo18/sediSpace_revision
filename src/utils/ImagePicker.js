import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

const launchImagePicker = async () => {
  await checkPermissions();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [1, 1],
    quality: 1,
    allowsMultipleSelection: true,
    selectionLimit: 10,
  });

  if (!result.canceled) {
    return result.assets;
  }
};

export const launcnCamera = async () => {
  await checkPermissions();

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
};

const checkPermissions = async () => {
  if (Platform.OS != "web") {
    const userPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (userPermission.granted == false) {
      return new Promise.reject("We need permissions to select an image");
    }
  }

  return new Promise.resolve();
};

export default launchImagePicker;
