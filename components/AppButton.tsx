import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
const AppButton = ({
  title = "Button",
  bg = "white",
  color = "black",
  onPress,
  fontSize = "16px",
  height = "50px",
  width = "100%",
  rounded = "10px",
  gap = "2px",
  fontWeight = "bold",
  disabled = false,
  diabledBg = "gray",
  disabledColor = "white",
  loading,
}: {
  title: string;
  bg?: string;
  color?: string;
  onPress?: () => void;
  fontSize?: string;
  height?: string;
  width?: string;
  rounded?: string;
  gap?: string;
  fontWeight?: string;
  disabled?: boolean;
  diabledBg?: string;
  disabledColor?: string;
  loading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={tw`bg-[${
        disabled ? diabledBg : bg
      }] w-[${width}] h-[${height}] rounded-[${rounded}] items-center justify-center flex flex-row gap-${gap} px-4`}
    >
      <Text
        style={tw`text-[${
          disabled ? disabledColor : color
        }] text-[${fontSize}] text-center font-${fontWeight}`}
      >
        {title}
      </Text>
      {loading && <ActivityIndicator size="small" color={color} />}
    </TouchableOpacity>
  );
};

export default AppButton;
