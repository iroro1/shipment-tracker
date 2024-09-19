import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Image, Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import AppButton from "../components/AppButton";
import LoginComponent from "../components/LoginComponent";

const LandingScreen = () => {
  const [loginModal, setLoginModal] = useState(false);
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center bg-[#2F50C1]`}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/textLogo.png")}
        style={tw`w-[207.63px] h-[36px]`}
        resizeMode="contain"
      />

      <View style={tw`absolute bottom-[32px] w-full px-[24px]`}>
        <AppButton
          title="Login"
          bg="#fff"
          color="#2F50C1"
          fontSize="17px"
          fontWeight="bold"
          onPress={() => {
            setLoginModal(true);
          }}
          width="100%"
        />
      </View>

      <Modal
        visible={loginModal}
        animationType="slide"
        transparent
        onRequestClose={() => setLoginModal(false)}
      >
        <View
          style={{
            marginTop: 30,
            flex: 1,
          }}
        >
          <LoginComponent closeModal={() => setLoginModal(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LandingScreen;
