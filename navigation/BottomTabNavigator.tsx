import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import ShipmentListScreen from "../screens/ShipmentListScreen";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import useCamera from "../hooks/useCamera";
import { RootState } from "../redux/rootReducer";
import {
  toggleAddScanModal,
  toggleFilterModal,
} from "../redux/slices/shipmentSlice";
import Profile from "../screens/Profile";
import ScanScreen from "../screens/ScanScreen";
import WalletScreen from "../screens/WalletScreen";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const dispatch = useDispatch();
  const { fiterModalOpen, addScanModalOpen } = useSelector(
    (state: RootState) => state.shipment
  );
  const [statusItems, setStatusItems] = useState([
    { selected: false, status: "Recieved" },
    { selected: false, status: "Putaway" },
    { selected: false, status: "Dellivered" },
    { selected: false, status: "Canceled" },
    { selected: false, status: "Rejected" },
    { selected: false, status: "Lost" },
    { selected: false, status: "On Hold" },
  ]);
  const [upload, setUpload] = useState(null);
  const { pickImage, camera } = useCamera();
  const galleryFn = async () => {
    await pickImage((e: any) => {
      setUpload(e?.img);
    });
  };
  const cameraFn = async () => {
    await camera((e: any) => {
      setUpload(e?.img);
    });
  };
  return (
    <>
      <Modal visible={fiterModalOpen} animationType="slide" transparent>
        <View style={tw`w-full h-full bg-black/30`}>
          <Pressable
            style={tw`w-full h-full`}
            onPress={() => dispatch(toggleFilterModal())}
          />

          <View
            style={tw`w-full  z-10 h-[300px] bg-white mt-auto rounded-t-[16px]`}
          >
            <Pressable
              style={tw`w-full  h-[4px] px-[16px] flex mt-2 justify-center items-center`}
              onPress={() => dispatch(toggleFilterModal())}
            >
              <View style={tw`w-[36px] rounded-full h-[5px] bg-gray-400`} />
            </Pressable>
            <View
              style={tw`w-full h-[50px] mt-0 border-b border-gray-300  flex-row justify-between items-center w-full px-[16px]`}
            >
              <TouchableOpacity
                onPress={() => {
                  setStatusItems(
                    statusItems.map((item) => {
                      return { ...item, selected: false };
                    })
                  );
                  dispatch(toggleFilterModal());
                }}
              >
                <Text style={tw`text-[#2F50C1] text-[14px]`}>Cancel</Text>
              </TouchableOpacity>
              <Text style={tw`text-lg font-bold`}>Filters</Text>
              <TouchableOpacity onPress={() => dispatch(toggleFilterModal())}>
                <Text style={tw`text-[#2F50C1] text-[14px]`}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={tw`w-full h-[250px] bg-white py-2 px-4`}>
              <Text>SHIPMENT STATUS</Text>

              <View style={tw`flex-row flex-wrap gap-[10px] mt-[12px]`}>
                {statusItems.map((itm) => (
                  <TouchableOpacity
                    onPress={() => {
                      setStatusItems(
                        statusItems.map((item) => {
                          if (itm.status === item.status)
                            return { ...itm, selected: !itm.selected };
                          else return item;
                        })
                      );
                    }}
                    style={tw`py-[9px] px-[14px] rounded-[6px] bg-[#F4F2F8] ${
                      itm.selected ? "border border-[#2F50C1]" : ""
                    }`}
                  >
                    <Text
                      style={tw`text-[${
                        itm.selected ? "#2F50C1" : "#58536E"
                      }] text-[16px]`}
                    >
                      {itm.status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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
            style={tw`w-full  z-10 h-${
              upload ? "[80%]" : "[300px]"
            } bg-white/97 mt-auto rounded-t flex justify-center items-center relative gap-4`}
          >
            <View
              style={tw`flex-row justify-between w-full px-[16px] absolute top-4`}
            >
              <Pressable
                onPress={() => {
                  dispatch(toggleAddScanModal());
                  setUpload(null);
                }}
              >
                <Text style={tw`text-[#2F50C1] text-[16px] w-[70px]`}>
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(toggleAddScanModal());
                }}
              >
                <Text style={tw`text-[#2F50C1] text-[16px] w-[40px]`}>
                  Done
                </Text>
              </Pressable>
            </View>
            {upload && (
              <View style={tw`h-[60%] w-full px-[16px] overflow-hidden`}>
                <Image
                  resizeMode="cover"
                  style={tw`h-full w-full rounded-lg`}
                  source={{
                    uri: upload,
                  }}
                />
              </View>
            )}
            <View style={tw`w-full flex-row justify-center gap-4`}>
              <View style={tw`border border-gray-400 rounded-4 p-4`}>
                <Ionicons
                  onPress={galleryFn}
                  name="file-tray"
                  size={40}
                  color="#2F50C1"
                />
              </View>
              <View style={tw`border border-gray-400 rounded-4 p-4`}>
                <Ionicons
                  onPress={cameraFn}
                  name="camera"
                  size={40}
                  color="#2F50C1"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <StatusBar style="auto" />

        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }: { color: string; size: number }) => {
              let iconName: any = "";

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
              width: "25%",
              paddingBottom: 4,
            },
            tabBarLabelStyle: {
              width: 200,
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
