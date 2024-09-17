import React, { useState, useEffect, useRef } from "react";
import { Animated, TextInput, View, Text } from "react-native";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const AppSearch = ({
  value,
  onChangeText,
  placeholder,
}: {
  value?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const placeholderPosition = useRef(
    new Animated.Value(value || isFocused ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(placeholderPosition, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused]);

  const borderColor = isFocused ? "#2F50C1" : "#F4F2F8";

  return (
    <View
      style={tw`relative flex-row justify-between bg-[#F4F2F8] rounded-[10px] items-center mt-2`}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color="#A7A3B3"
        style={tw`absolute top-[14px] left-[18px] z-10`}
      />
      <TextInput
        style={[
          tw` w-full flex-1  bg-[#F4F2F8]/50 text-[16px] text-[#2F50C1] h-[44px] px-[18px] rounded-[6px]`,
          { borderColor, borderWidth: 1 },
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={"#A7A3B3"}
      />
      <Animated.Text
        style={[
          tw`absolute ${value ? "hidden" : ""} left-[${
            isFocused ? "18px" : "50px"
          }] top-[${isFocused ? "22px" : "14px"}] text-[${
            !isFocused ? "16px" : "11px"
          }] text-[#58536E]`,
          {
            opacity: placeholderPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1],
            }),
            transform: [
              {
                translateY: placeholderPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                }),
              },
            ],
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
    </View>
  );
};

export default AppSearch;
