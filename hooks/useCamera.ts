import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

interface FileResult {
  base64?: string;
  type?: string;
  fileName?: string;
}

interface PickedImageResult {
  url: string;
  vid: string;
  img: string;
  file: ImagePicker.ImagePickerAsset;
  mainFile: ImagePicker.ImagePickerAsset;
}

const useCamera = () => {
  const [pickedImagePath, setPickedImagePath] =
    useState<PickedImageResult | null>(null);
  const dispatch = useDispatch();

  const openCamera = async (
    chosenImg: (data: PickedImageResult) => void
  ): Promise<PickedImageResult | null> => {
    // Ask the user for permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("You've refused to allow this app to access your camera!");
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const fileURI = result.assets[0].uri;
      const fsRead = await FileSystem.readAsStringAsync(fileURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64Img = `data:image/jpeg;base64,${fsRead}`;

      const data: PickedImageResult = {
        url: "",
        vid: "", // No video for camera capture
        img: base64Img,
        file: result.assets[0],
        mainFile: result.assets[0],
      };

      // Pass the result to the callback
      chosenImg(data);
      setPickedImagePath(data);

      return data;
    }

    return null;
  };

  const pickImage = async (
    chosenImg: (data: PickedImageResult) => void,
    type: keyof typeof ImagePicker.MediaTypeOptions = "All"
  ): Promise<PickedImageResult | null> => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[type],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const fileURI = result.assets[0].uri;

      const fsRead = await FileSystem.readAsStringAsync(fileURI, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const base64Vid = `data:video/mp4;base64,${fsRead}`;
      const base64Img = `data:image/jpeg;base64,${fsRead}`;

      const data: PickedImageResult = {
        url: "",
        vid: base64Vid,
        img: base64Img,
        file: result.assets[0],
        mainFile: result.assets[0],
      };

      chosenImg(data);
      setPickedImagePath(data);
      return data;
    }

    return null;
  };

  return { camera: openCamera, result: pickedImagePath, pickImage };
};

export default useCamera;
