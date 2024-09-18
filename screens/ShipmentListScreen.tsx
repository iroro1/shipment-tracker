import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import AppCheckbox from "../components/AppCheckbox";
import AppSearch from "../components/AppSearch";
import ShipmentCard from "../components/ShipmentCard";
import { RootState } from "../redux/rootReducer";
import {
  markAllShipmentAsSelected,
  setShipments,
  toggleAddScanModal,
  toggleFilterModal,
} from "../redux/slices/shipmentSlice";
import { getShipmentsFn } from "../services/authService";

export default function ShipmentListScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const shipments = useSelector((state: RootState) => state.shipment.shipments);
  const auth: any = useSelector((state: RootState) => state.auth);
  const [temp, setTemp] = useState<any>([]);

  const loadShipments = async () => {
    setIsLoading(true);

    try {
      const response: any = await getShipmentsFn();

      if (response.status === 200) {
        const data: any = [];
        response.data.message.forEach((d: any, i: number) => {
          data.push({ ...d, id: i, selected: false });
        });
        dispatch(setShipments(data));
      } else {
        Alert.alert(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error loading shipments");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadShipments();
  }, []);

  console.log(temp);

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
          {auth.user || "Ibrahim Shaker"}
        </Text>

        <AppSearch
          placeholder="Search"
          onChangeText={(value) => {
            temp.length === 0 && setTemp(shipments);
            shipments.length === 0 && dispatch(setShipments(temp));
            shipments.length > 0 &&
              dispatch(
                setShipments(
                  shipments.filter((itm: any) => itm.barcode.includes(value))
                )
              );
          }}
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

          <TouchableOpacity
            style={tw`flex-row items-center`}
            onPress={() => {
              dispatch(markAllShipmentAsSelected());
            }}
          >
            <View
              style={[
                tw`w-[20px] h-[20px] border border-[#D0D5DD] rounded`,
                shipments.filter((itm) => itm.selected).length > 0
                  ? { backgroundColor: "#2F50C1" }
                  : { backgroundColor: "#fff" },
              ]}
            >
              <View style={[styles.checkmarkContainer]}>
                <Text style={[styles.checkmark]}>✓</Text>
              </View>
            </View>
            <Text style={tw`ml-2 text-[#2F50C1] text-[16px]`}>Mark All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={tw`mt-[12px]`}
        data={shipments}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => <ShipmentCard data={item} />}
        refreshing={isLoading}
        onRefresh={() => {
          loadShipments();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  checkmarkContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
