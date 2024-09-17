import React, { useState, useEffect, useRef } from "react";
import { Animated, TextInput, View, Text } from "react-native";
import tw from "twrnc";

const AppInput = ({
  value,
  onChangeText,
  label,
  type = "text",
}: {
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  type?: "text" | "password" | "url" | "email";
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(
    new Animated.Value(value || isFocused ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused]);

  // Determine border color based on focus state only
  const borderColor = isFocused ? "#2F50C1" : "#F4F2F8";

  const handleChangeText = (text: string) => {
    // Convert text to lowercase if type is not 'password'
    const processedText = type !== "password" ? text.toLowerCase() : text;
    onChangeText(processedText);
  };

  return (
    <View style={tw`relative w-full`}>
      <Animated.Text
        style={[
          tw`absolute left-[14px] text-[11px] px-[4px] ${
            isFocused ? "z-10" : ""
          }`,
          {
            top: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 4],
            }),
            fontSize: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [18, 12],
            }),
            color: "#58536E",
          },
        ]}
      >
        {label}
      </Animated.Text>
      {type === "url" && isFocused && (
        <Text style={tw`absolute left-[18px] text-[16px] top-[20px]`}>
          https://
        </Text>
      )}
      <TextInput
        style={[
          tw`bg-[#F4F2F8]/50 text-[16px] text-[#2F50C1] pt-[4px] h-[56px] w-full px-[18px] rounded-[6px]`,
          { borderColor, borderWidth: 1 },
          type === "url" && isFocused ? { paddingLeft: 80 } : {},
        ]}
        value={value}
        onChangeText={handleChangeText} // Updated function
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#A7A3B3"}
        secureTextEntry={type === "password"}
      />
    </View>
  );
};

export default AppInput;
