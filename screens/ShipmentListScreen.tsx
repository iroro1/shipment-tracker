import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import AppCheckbox from "../components/AppCheckbox";
import AppSearch from "../components/AppSearch";
import ShipmentCard from "../components/ShipmentCard";
import { RootState } from "../redux/rootReducer";
import {
  markAllShipmentAsSelected,
  toggleAddScanModal,
  toggleFilterModal,
} from "../redux/slices/shipmentSlice";

export default function ShipmentListScreen() {
  const dispatch = useDispatch();
  const shipments = useSelector((state: RootState) => state.shipment.shipments);

  return (
    <View style={tw`flex-1 px-[16px] bg-white`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Image
          style={tw`w-[40px] h-[40px]`}
          source={require("../assets/images/profilePic.png")}
        />
        <Image
          style={tw`w-[92.28px] h-[16px]`}
          source={require("../assets/images/textLogoBlue.png")}
        />
        <TouchableOpacity
          style={tw`h-[40px] w-[40px] bg-[#F4F2F8] rounded-full items-center justify-center ]`}
        >
          <Ionicons name="notifications-outline" size={24} color="#2F50C1" />
        </TouchableOpacity>
      </View>
      <View style={tw`mt-[12px]`}>
        <Text style={tw`text-[14px] text-black/60`}>Hello,</Text>
        <Text style={[tw`text-[28px]`, { fontWeight: "semibold" }]}>
          Ibrahim Shaker
        </Text>

        <AppSearch
          placeholder="Search"
          onChangeText={(value) => console.log(value)}
          // value=""
        />

        <View style={tw`flex-row justify-between mt-[12px]`}>
          <TouchableOpacity
            onPress={() => dispatch(toggleFilterModal())}
            style={tw`bg-[#F4F2F8] h-[44px] rounded-[10px] w-[48%] max-w-[173px] gap-[8px] flex-row items-center justify-center`}
          >
            <Image
              style={tw`w-[24px] h-[24px]`}
              source={require("../assets/images/filter.png")}
            />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(toggleAddScanModal())}
            style={tw`bg-[#2F50C1] h-[44px] rounded-[10px] w-[173px] gap-[8px] flex-row items-center justify-center`}
          >
            <Image
              style={tw`w-[24px] h-[24px]`}
              source={require("../assets/images/scan.png")}
              resizeMode="contain"
            />
            <Text style={tw`text-white text-[16px]`}>Add Scan</Text>
          </TouchableOpacity>
        </View>

        <View style={tw`mt-[14px] flex-row justify-between`}>
          <Text
            style={[tw`text-[22px] text-black`, { fontWeight: "semibold" }]}
          >
            Shipments
          </Text>

          <AppCheckbox
            label="Mark All"
            onChange={() => {
              dispatch(markAllShipmentAsSelected());
            }}
            checked={false}
          />
        </View>
      </View>

      <FlatList
        style={tw`mt-[12px]`}
        data={shipments}
        keyExtractor={(item: any) => item.id.toString()}
        renderItem={({ item }: any) => <ShipmentCard data={item} />}
        refreshing={false}
        onRefresh={() => {}}
      />
    </View>
  );
}
