import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { MotiView } from "moti";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Landing");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <MotiView
        from={{ scale: 0.5 }}
        animate={{ scale: 3 }}
        transition={{ type: "timing", duration: 2000 }}
        style={tw`justify-center items-center`}
      >
        <Image
          source={require("../assets/images/splashEnd.png")}
          style={tw`w-24 h-24`}
        />
      </MotiView>
    </View>
  );
}
