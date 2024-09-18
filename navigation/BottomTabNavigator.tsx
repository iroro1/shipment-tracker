// src/navigation/BottomTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShipmentListScreen from "../screens/ShipmentListScreen";
// import AnotherScreen from "../screens/AnotherScreen";
// import NotificationScreen from "../screens/NotificationScreen";
// import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons"; // or react-native-vector-icons
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import tw from "twrnc";
import {
  toggleAddScanModal,
  toggleFilterModal,
} from "../redux/slices/shipmentSlice";
import ScanScreen from "../screens/ScanScreen";
import WalletScreen from "../screens/WalletScreen";
import Profile from "../screens/Profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const dispatch = useDispatch();
  const { fiterModalOpen, addScanModalOpen } = useSelector(
    (state: RootState) => state.shipment
  );

  return (
    <>
      <Modal visible={fiterModalOpen} animationType="slide" transparent>
        <View style={tw`w-full h-full bg-black/30`}>
          <Pressable
            style={tw`w-full h-full`}
            onPress={() => dispatch(toggleFilterModal())}
          />

          <View style={tw`w-full  z-10 h-[300px] bg-white mt-auto rounded-t`}>
            <Pressable
              style={tw`w-full  h-[4px]  flex my-2 justify-center items-center`}
              onPress={() => dispatch(toggleFilterModal())}
            >
              <View style={tw`w-[28px] rounded-full h-[4px] bg-gray-400`} />
            </Pressable>
            <View
              style={tw`w-full h-[50px] mt-2 border-b border-gray-300  flex-row justify-between items-center w-full px-[16px]`}
            >
              <TouchableOpacity>
                <Text style={tw``}>Cancel</Text>
              </TouchableOpacity>
              <Text style={tw`text-lg font-bold`}>Filters</Text>
              <TouchableOpacity>
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`w-full h-[250px] bg-white`}></View>
          </View>
        </View>
      </Modal>
      <Modal visible={addScanModalOpen} animationType="slide" transparent>
        <View style={tw`w-full h-full bg-black/30`}>
          <Pressable
            style={tw`w-full h-full`}
            onPress={() => dispatch(toggleAddScanModal())}
          />
          <View
            style={tw`w-full  z-10 h-[300px] bg-white mt-auto rounded-t`}
          ></View>
        </View>
      </Modal>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <StatusBar style="auto" />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => {
              let iconName: string;

              if (route.name === "ShipmentList") {
                iconName = "cube";
              } else if (route.name === "Scan") {
                iconName = "barcode";
              } else if (route.name === "Wallet") {
                iconName = "wallet";
              } else if (route.name === "Profile") {
                iconName = "person";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#4561DB",
            tabBarInactiveTintColor: "#A7A3B3",
            tabBarAllowFontScaling: false,
            tabBarItemStyle: {
              paddingTop: 8,
              height: 50,
            },
          })}
        >
          <Tab.Screen name="ShipmentList" component={ShipmentListScreen} />
          <Tab.Screen name="Scan" component={ScanScreen} />
          <Tab.Screen name="Wallet" component={WalletScreen} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </SafeAreaView>
    </>
  );
}
