import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AppInput from "./AppInput";
import AppButton from "./AppButton";
export default function LoginComponent({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogin = () => {
    // const user = { username };
    // dispatch(login(user));
    navigation.navigate("ShipmentList");
    closeModal();
    // Navigate to ShipmentList screen
  };
  const disabled = url === "" || username === "" || password === "";
  return (
    <View style={tw`flex-1 rounded-t-[20px] bg-white px-[16px]`}>
      <TouchableOpacity
        onPress={() => closeModal()}
        style={tw` top-0 left-0 py-4 flex flex-row w-full items-center gap-[3px]`}
      >
        <Icon name="chevron-back" size={24} color="#4561DB" />
        <Text style={tw`text-[#4561DB] text-[17px]`}>Cancel</Text>
      </TouchableOpacity>
      <Text
        style={[tw`text-[34px]  mb-4 text-left`, { fontWeight: "semibold" }]}
      >
        Login
      </Text>

      <Text style={tw`text-[17px] text-[#757281] mb-[38px]`}>
        Please enter your First, Last name and your phone number in order to
        register
      </Text>
      <View style={tw`mb-[31px]`}>
        <AppInput value={url} onChangeText={setUrl} label="URL" type="url" />
      </View>
      <View style={tw`mb-[31px]`}>
        <AppInput
          value={username}
          onChangeText={setUsername}
          label="Username / Email"
        />
      </View>

      <View style={tw`mb-[31px]`}>
        <AppInput
          value={password}
          onChangeText={setPassword}
          label="Password"
          type="password"
        />
      </View>

      <View style={tw`absolute bottom-[32px] w-full left-[16px]`}>
        <AppButton
          title="Login"
          bg="#2F50C1"
          color="#fff"
          fontSize="17px"
          fontWeight="bold"
          onPress={() => handleLogin()}
          width="100%"
          disabled={disabled}
          diabledBg="#EAE7F2"
          disabledColor="#A7A3B3"
        />
      </View>
    </View>
  );
}
