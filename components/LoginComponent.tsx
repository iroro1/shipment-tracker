import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AppInput from "./AppInput";
import AppButton from "./AppButton";
import { RootStackParamList } from "../types";
import { loginFn } from "../services/authService";
export default function LoginComponent({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    // test@brandimic.com
    // testy123@
    setIsLoading(true);
    try {
      const response: any = await loginFn(username, password);
      if (response?.status === 200) {
        dispatch(login(response.data.full_name));
        navigation.navigate("ShipmentList");
        closeModal();
      } else {
        Alert.alert(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const disabled = url === "" || username === "" || password === "";
  return (
    <View style={tw`flex-1 rounded-t-[20px] bg-white px-[16px]`}>
      <TouchableOpacity
        onPress={() => closeModal()}
        style={tw` top-0 left-0 py-4 flex flex-row w-full items-center gap-[3px]`}
      >
        <Ionicons name="chevron-back" size={24} color="#4561DB" />
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
          loading={isLoading}
        />
      </View>
    </View>
  );
}
